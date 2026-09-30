import os
import json
import logging
from django.utils import timezone
from groq import Groq
from feedback.models import Feedback
from ai_engine.models import FeedbackAnalysis, AIInsight, DailyDigest

logger = logging.getLogger(__name__)

def get_groq_client():
    api_key = os.environ.get('GROQ_API_KEY')
    if not api_key:
        from django.conf import settings
        from dotenv import load_dotenv
        load_dotenv(settings.BASE_DIR / '.env')
        api_key = os.environ.get('GROQ_API_KEY')
    if api_key:
        try:
            return Groq(api_key=api_key)
        except Exception as e:
            logger.error(f"Failed to initialize Groq client: {e}")
    return None

def analyze_feedback_task(feedback_id):
    """
    Background task to analyze feedback using an LLM with fallback rule heuristics.
    """
    try:
        feedback = Feedback.objects.get(id=feedback_id)
    except Feedback.DoesNotExist:
        logger.error(f"Feedback {feedback_id} not found.")
        return

    text_content = feedback.custom_remark or "No custom remark provided."
    issue_tags = ", ".join(feedback.issue_tags) if feedback.issue_tags else "None"
    positive_tags = ", ".join(feedback.positive_tags) if feedback.positive_tags else "None"

    # Quick check for critical indicators
    critical_keywords = [
        'insect', 'bug', 'cockroach', 'fly', 'glass', 'hair', 'stone', 'worm',
        'poison', 'vomit', 'diarrhea', 'hospital', 'sick', 'raw', 'undercooked',
        'spoiled', 'stale', 'rotten', 'fungus', 'mold', 'smell', 'foul', 'blood'
    ]
    has_critical_keyword = any(kw in text_content.lower() for kw in critical_keywords)
    has_critical_tag = any(t in ['Foreign Object', 'Hygiene Issue', 'Stale / Spoiled', 'Undercooked / Raw'] for t in (feedback.issue_tags or []))

    client = get_groq_client()
    result = None

    if client:
        prompt = f"""
        Analyze the following student feedback for a university mess meal.
        
        Rating: {feedback.rating}/5
        Issue Tags: {issue_tags}
        Positive Tags: {positive_tags}
        Student Remark: "{text_content}"

        Extract the following information and return ONLY a valid JSON object matching this schema:
        {{
            "sentiment": "POSITIVE" | "NEUTRAL" | "NEGATIVE" | "MIXED",
            "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
            "themes": ["theme1", "theme2"],
            "summary": "A detailed 1-paragraph summary of the student's feedback and sentiment",
            "action_required": true,
            "action_title": "Short title if action_required is true, else null",
            "action_description": "Detailed description if action is required, else null"
        }}

        Guidelines:
        - Food poisoning, foreign objects (insects, glass), or severe hygiene issues must be "CRITICAL".
        - Cold food or slight delays are "LOW" or "MEDIUM".
        - Base the severity strictly on the evidence provided.
        """

        try:
            response = client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": "You are a professional analytics engine for a food service system. You strictly output valid JSON."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                model="openai/gpt-oss-20b",
                response_format={"type": "json_object"},
                temperature=0.1,
            )
            result_json = response.choices[0].message.content
            result = json.loads(result_json)
        except Exception as e:
            logger.error(f"Error calling Groq API: {e}")
            result = None

    # Fallback heuristic if LLM failed or is unconfigured
    if not result:
        if has_critical_keyword or has_critical_tag or feedback.rating == 1:
            sentiment = "NEGATIVE"
            severity = "CRITICAL" if (has_critical_keyword or has_critical_tag or feedback.rating == 1) else "HIGH"
            summary = f"Severe issue reported: {text_content[:80]}" if feedback.custom_remark else "Critical 1-star rating submitted."
            themes = feedback.issue_tags or ["Hygiene / Quality"]
            action_required = True
            action_title = "Urgent Kitchen Inspection Required"
        elif feedback.rating == 2:
            sentiment = "NEGATIVE"
            severity = "HIGH"
            summary = f"Quality complaint: {text_content[:80]}" if feedback.custom_remark else "Low 2-star rating."
            themes = feedback.issue_tags or ["Taste / Quality"]
            action_required = False
            action_title = None
        elif feedback.rating == 3:
            sentiment = "NEUTRAL"
            severity = "MEDIUM"
            summary = f"Average experience: {text_content[:80]}" if feedback.custom_remark else "Neutral feedback."
            themes = feedback.issue_tags or ["General"]
            action_required = False
            action_title = None
        else:
            sentiment = "POSITIVE"
            severity = "LOW"
            summary = f"Positive review: {text_content[:80]}" if feedback.custom_remark else "High rating received."
            themes = feedback.positive_tags or ["Satisfaction"]
            action_required = False
            action_title = None

        result = {
            "sentiment": sentiment,
            "severity": severity,
            "themes": themes,
            "summary": summary,
            "action_required": action_required,
            "action_title": action_title
        }

    try:
        # Create or update FeedbackAnalysis
        analysis, _ = FeedbackAnalysis.objects.update_or_create(
            feedback=feedback,
            defaults={
                "language": "en",
                "transcript": text_content,
                "sentiment": result.get("sentiment", "NEUTRAL"),
                "severity": result.get("severity", "LOW"),
                "themes": result.get("themes", []),
                "summary": result.get("summary", ""),
                "provider": "Groq" if client else "RuleEngine",
                "model": "openai/gpt-oss-20b" if client else "Heuristic"
            }
        )

        # Create Insight if critical or high severity
        is_critical = result.get("severity") == "CRITICAL"
        action_required = result.get("action_required")
        if is_critical or (action_required and result.get("severity") == "HIGH"):
            action_title = result.get("action_title") or "Critical Feedback Review Required"
            AIInsight.objects.create(
                insight_type="Safety/Quality Alert",
                title=f"Alert: {action_title}",
                summary=result.get('summary') or "Critical feedback detected.",
                evidence={"feedback_id": feedback.id, "tags": feedback.issue_tags, "remark": text_content},
                severity=result.get("severity"),
                date=timezone.now().date()
            )

        feedback.status = 'ANALYZED'
        feedback.save()

    except Exception as e:
        logger.error(f"Error saving analysis for feedback {feedback_id}: {e}")
        feedback.status = 'FAILED'
        feedback.save()

def generate_daily_digest_task():
    """
    Background task to generate a daily digest using all feedback from today.
    """
    client = get_groq_client()
    today = timezone.now().date()
    feedbacks = Feedback.objects.filter(created_at__date=today).prefetch_related('analysis')
    
    if not feedbacks.exists():
        logger.info("No feedback today, skipping digest.")
        return
    
    avg_rating = sum(f.rating for f in feedbacks) / len(feedbacks)

    # Limit to top 20 to prevent context limit errors and JSON failures
    data_points = []
    for f in list(feedbacks)[:20]:
        sentiment = f.analysis.sentiment if hasattr(f, 'analysis') else "UNKNOWN"
        data_points.append(f"Meal: {f.meal.name} | Rating: {f.rating}/5 | Tags: {f.issue_tags + f.positive_tags} | Remark: {f.custom_remark} | Sentiment: {sentiment}")

    result = None
    if client:
        prompt = f"""
        You are an expert food service operations analyst. 
        Analyze the following feedback data for {today} and generate a daily digest report.

        Raw Data:
        {chr(10).join(data_points)}

        Return ONLY a valid JSON object matching this schema:
        {{
            "overview": "A detailed 1-paragraph overview of the day's feedback.",
            "top_issues": ["Issue 1", "Issue 2"],
            "positive_signals": ["Positive 1", "Positive 2"],
            "recommendations": ["Rec 1", "Rec 2"]
        }}
        """

        try:
            response = client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You strictly output valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                model="openai/gpt-oss-20b",
                temperature=0.2,
            )
            raw_text = response.choices[0].message.content
            # basic clean up in case of markdown blocks
            raw_text = raw_text.replace("```json", "").replace("```", "").strip()
            result = json.loads(raw_text)
        except Exception as e:
            logger.error(f"Error generating daily digest via Groq: {e}")

    if not result:
        result = {
            "overview": f"Summary for {today}: Total {len(feedbacks)} feedbacks received with an average rating of {round(avg_rating, 1)}/5.",
            "top_issues": ["Review flagged issues in meals"],
            "positive_signals": ["Feedback recorded across student body"],
            "recommendations": ["Address kitchen complaints and check ingredient quality"]
        }

    DailyDigest.objects.update_or_create(
        date=today,
        defaults={
            'overview': result.get("overview", "No overview provided."),
            'response_count': len(feedbacks),
            'average_rating': avg_rating,
            'positive_signals': result.get("positive_signals", []),
            'top_issues': result.get("top_issues", []),
            'recommendations': result.get("recommendations", [])
        }
    )
    logger.info(f"Daily digest for {today} created/updated successfully.")

