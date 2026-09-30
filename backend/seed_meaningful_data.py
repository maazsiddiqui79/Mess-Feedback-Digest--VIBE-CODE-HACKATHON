import os
import sys
import urllib.request
from pathlib import Path
from datetime import time, timedelta

# Setup Django
BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

import django
django.setup()

from django.utils import timezone
from django.core.files import File
from django.conf import settings
from accounts.models import User, StudentProfile
from meals.models import Meal
from feedback.models import Feedback, FeedbackMedia
from ai_engine.models import FeedbackAnalysis, AIInsight, DailyDigest
from community.models import CommunityPost, CommunityComment, CommunityReaction, Poll, PollOption

print("[+] Seeding meaningful university mess data...")

# Target media directory
media_dir = Path(settings.MEDIA_ROOT) / 'feedback_media'
media_dir.mkdir(parents=True, exist_ok=True)

# Curated high quality Indian Food & Quality issue images
IMAGE_CATALOG = {
    'dosa': {
        'url': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
        'filename': 'masala_dosa_crispy.jpg'
    },
    'biryani': {
        'url': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
        'filename': 'hyderabadi_biryani.jpg'
    },
    'paneer': {
        'url': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
        'filename': 'paneer_butter_masala.jpg'
    },
    'samosa': {
        'url': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
        'filename': 'samosa_snacks.jpg'
    },
    'curry_issue': {
        'url': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
        'filename': 'oily_curry_plate.jpg'
    },
    'paratha': {
        'url': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80',
        'filename': 'stuffed_paratha.jpg'
    },
    'mess_tray': {
        'url': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
        'filename': 'mess_thali_tray.jpg'
    },
    'soup_watery': {
        'url': 'https://images.unsplash.com/photo-1584947897585-61f4fa01eb70?auto=format&fit=crop&w=600&q=80',
        'filename': 'watery_dal_issue.jpg'
    }
}

downloaded_files = {}
for key, item in IMAGE_CATALOG.items():
    file_path = media_dir / item['filename']
    if not file_path.exists():
        try:
            print(f"  Downloading image for {key}...")
            req = urllib.request.Request(item['url'], headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as response, open(file_path, 'wb') as out_file:
                out_file.write(response.read())
            downloaded_files[key] = f"feedback_media/{item['filename']}"
        except Exception as e:
            print(f"  Warning: could not download {key} ({e})")
    else:
        downloaded_files[key] = f"feedback_media/{item['filename']}"

# Students
students = list(User.objects.filter(role='STUDENT'))
if not students:
    student = User.objects.create_user(email='student@messmind.edu', password='student123', role='STUDENT')
    students = [student]

today = timezone.now().date()
yesterday = today - timedelta(days=1)

# 1. MEALS
print("[+] Creating meal schedules...")
meals_data = [
    # Today
    {'name': 'South Indian Breakfast: Masala Dosa, Idli & Filter Coffee', 'meal_type': 'BREAKFAST', 'date': today, 'start': time(7, 30), 'end': time(9, 30), 'desc': 'Crisp dosas, steamed idlis, fresh coconut chutney and piping hot sambar.'},
    {'name': 'North Indian Thali: Paneer Butter Masala, Dal Tadka & Jeera Rice', 'meal_type': 'LUNCH', 'date': today, 'start': time(12, 30), 'end': time(14, 30), 'desc': 'Rich paneer gravy, yellow dal tadka, hot phulkas, jeera rice and cucumber salad.'},
    {'name': 'Evening Snacks: Crispy Samosas, Mint Chutney & Masala Chai', 'meal_type': 'SNACKS', 'date': today, 'start': time(17, 0), 'end': time(18, 30), 'desc': 'Freshly fried potato samosas served with sweet tamarind and mint chutney.'},
    {'name': 'Royal Dinner: Dum Biryani, Mixed Veg Curry & Gulab Jamun', 'meal_type': 'DINNER', 'date': today, 'start': time(19, 30), 'end': time(21, 30), 'desc': 'Fragrant dum biryani served with boondi raita, veg salan and warm gulab jamun.'},
    # Yesterday
    {'name': 'Aloo Poha, Boiled Eggs & Seasonal Fruits', 'meal_type': 'BREAKFAST', 'date': yesterday, 'start': time(7, 30), 'end': time(9, 30), 'desc': 'Indori style poha with sev, roasted peanuts, and banana.'},
    {'name': 'Rajma Masala, Steamed Basmati Rice & Tawa Roti', 'meal_type': 'LUNCH', 'date': yesterday, 'start': time(12, 30), 'end': time(14, 30), 'desc': 'Traditional Punjabi rajma curry with basmati rice, rotis and onion salad.'},
    {'name': 'Pav Bhaji & Masala Buttermilk', 'meal_type': 'DINNER', 'date': yesterday, 'start': time(19, 30), 'end': time(21, 30), 'desc': 'Buttery pav with spicy mashed vegetable bhaji, lemon wedges and chaas.'},
]

meals_map = {}
for m in meals_data:
    obj, _ = Meal.objects.update_or_create(
        name=m['name'],
        date=m['date'],
        defaults={
            'meal_type': m['meal_type'],
            'start_time': m['start'],
            'end_time': m['end'],
            'menu_description': m['desc'],
            'is_active': True,
        }
    )
    meals_map[(m['date'], m['meal_type'])] = obj

# 2. FEEDBACK DATA
print("[+] Generating realistic student reviews with media and AI analysis...")

feedbacks_blueprint = [
    # Critical 1-star issues
    {
        'meal': meals_map[(today, 'LUNCH')],
        'student': students[0 % len(students)],
        'rating': 1,
        'issues': ['Foreign Object', 'Hygiene Issue'],
        'positives': [],
        'remark': 'Found a dead insect in the cabbage salad! Completely unacceptable kitchen hygiene standards.',
        'image': 'curry_issue',
        'severity': 'CRITICAL',
        'sentiment': 'NEGATIVE',
        'themes': ['Hygiene', 'Foreign Object', 'Kitchen Sanitation'],
        'summary': 'Critical foreign object (insect) found in meal salad; urgent inspection warranted.',
        'insight': 'Critical health hazard: Foreign object detected in today\'s lunch salad.',
    },
    {
        'meal': meals_map[(today, 'DINNER')],
        'student': students[1 % len(students)],
        'rating': 1,
        'issues': ['Undercooked / Raw', 'Bad Smell / Burnt'],
        'positives': [],
        'remark': 'The paneer pieces were raw and rubbery in the middle, and the biryani rice was burnt at the bottom.',
        'image': 'biryani',
        'severity': 'CRITICAL',
        'sentiment': 'NEGATIVE',
        'themes': ['Food Quality', 'Cooking Standard'],
        'summary': 'Raw ingredients and burnt bottom batch served during dinner.',
        'insight': 'Quality alert: Undercooked ingredients and burnt food reported by diners.',
    },
    {
        'meal': meals_map[(today, 'BREAKFAST')],
        'student': students[2 % len(students)],
        'rating': 1,
        'issues': ['Stale / Spoiled', 'Bad Smell / Burnt'],
        'positives': [],
        'remark': 'The coconut chutney was totally sour and fermented, gave me a bad stomach ache.',
        'image': 'dosa',
        'severity': 'CRITICAL',
        'sentiment': 'NEGATIVE',
        'themes': ['Food Safety', 'Spoiled Dairy / Chutney'],
        'summary': 'Sour and fermented chutney served at breakfast resulting in digestive complaints.',
        'insight': 'Health alert: Spoiled fermented side dish reported at breakfast counter.',
    },

    # High severity complaints
    {
        'meal': meals_map[(today, 'LUNCH')],
        'student': students[3 % len(students)],
        'rating': 2,
        'issues': ['Cold Food', 'Too Oily'],
        'positives': [],
        'remark': 'Food was served cold by 1:15 PM and oil was floating in a thick layer over the dal.',
        'image': 'soup_watery',
        'severity': 'HIGH',
        'sentiment': 'NEGATIVE',
        'themes': ['Temperature', 'Excess Oil'],
        'summary': 'Cold food temperature and excessive oil content in lunch dal.',
        'insight': None,
    },
    {
        'meal': meals_map[(today, 'SNACKS')],
        'student': students[4 % len(students)],
        'rating': 2,
        'issues': ['Insufficient Quantity', 'Long Queue'],
        'positives': [],
        'remark': 'Samosas ran out within 25 minutes! More than 40 students waiting in line had to leave empty handed.',
        'image': 'samosa',
        'severity': 'HIGH',
        'sentiment': 'NEGATIVE',
        'themes': ['Inventory Shortage', 'Queue Management'],
        'summary': 'Severe snack shortage with queue exceeding batch capacity.',
        'insight': None,
    },

    # Neutral / Balanced reviews
    {
        'meal': meals_map[(today, 'LUNCH')],
        'student': students[1 % len(students)],
        'rating': 3,
        'issues': ['Taste / Spicing'],
        'positives': ['Clean Dining Hall'],
        'remark': 'Paneer gravy was creamy but had no salt or spices at all. Roti was decent though.',
        'image': 'paneer',
        'severity': 'MEDIUM',
        'sentiment': 'NEUTRAL',
        'themes': ['Seasoning', 'Flavour Balance'],
        'summary': 'Bland seasoning in main dish despite good texture and clean seating.',
        'insight': None,
    },
    {
        'meal': meals_map[(today, 'BREAKFAST')],
        'student': students[5 % len(students)],
        'rating': 3,
        'issues': ['Cold Food'],
        'positives': ['Good Taste'],
        'remark': 'Dosa batter tasted great, but they made them in advance so it was already soft and lukewarm.',
        'image': 'dosa',
        'severity': 'MEDIUM',
        'sentiment': 'NEUTRAL',
        'themes': ['Freshness', 'Serving Speed'],
        'summary': 'Good recipe taste compromised by pre-making batches that went lukewarm.',
        'insight': None,
    },

    # Positive 4-Star reviews
    {
        'meal': meals_map[(today, 'DINNER')],
        'student': students[6 % len(students)],
        'rating': 4,
        'issues': [],
        'positives': ['Delicious', 'Hot & Fresh'],
        'remark': 'Biryani spices were well balanced and aroma was superb! Just need slightly more raita portion.',
        'image': 'biryani',
        'severity': 'LOW',
        'sentiment': 'POSITIVE',
        'themes': ['Aroma', 'Taste Satisfaction'],
        'summary': 'High praise for biryani preparation with minor request for larger raita cups.',
        'insight': None,
    },
    {
        'meal': meals_map[(today, 'LUNCH')],
        'student': students[7 % len(students)],
        'rating': 4,
        'issues': [],
        'positives': ['Adequate Quantity', 'Fresh Ingredients'],
        'remark': 'Very filling lunch today. The jeera rice was fragrant and rotis were hot and soft.',
        'image': 'mess_tray',
        'severity': 'LOW',
        'sentiment': 'POSITIVE',
        'themes': ['Portion Size', 'Warmth'],
        'summary': 'Satisfied feedback regarding meal portion and roti softness.',
        'insight': None,
    },

    # Exceptional 5-Star reviews
    {
        'meal': meals_map[(today, 'BREAKFAST')],
        'student': students[0 % len(students)],
        'rating': 5,
        'issues': [],
        'positives': ['Crispy & Fresh', 'Authentic Taste', 'Quick Refill'],
        'remark': 'Outstanding breakfast! The dosas were ultra crispy right off the griddle and sambar was heavenly.',
        'image': 'dosa',
        'severity': 'LOW',
        'sentiment': 'POSITIVE',
        'themes': ['Excellence', 'Authentic Flavours'],
        'summary': 'Top marks for live griddle dosas and authentic sambar preparation.',
        'insight': None,
    },
    {
        'meal': meals_map[(today, 'SNACKS')],
        'student': students[2 % len(students)],
        'rating': 5,
        'issues': [],
        'positives': ['Crispy & Fresh', 'Delicious', 'Hot Tea'],
        'remark': 'The samosas were freshly fried, hot, crisp, and the adrak-elachi chai was restaurant quality!',
        'image': 'samosa',
        'severity': 'LOW',
        'sentiment': 'POSITIVE',
        'themes': ['Snack Quality', 'Beverage Excellence'],
        'summary': 'Students delighted with fresh hot samosas and ginger cardamom tea.',
        'insight': None,
    },
    {
        'meal': meals_map[(today, 'LUNCH')],
        'student': students[4 % len(students)],
        'rating': 5,
        'issues': [],
        'positives': ['Delicious', 'Adequate Quantity', 'Polite Staff'],
        'remark': 'Paneer butter masala was restaurant grade! Big paneer chunks and the service counter was super efficient.',
        'image': 'paneer',
        'severity': 'LOW',
        'sentiment': 'POSITIVE',
        'themes': ['Quality Meal', 'Counter Efficiency'],
        'summary': 'Exceptional paneer butter masala received praise for portion size and speed.',
        'insight': None,
    },
]

for fb_data in feedbacks_blueprint:
    fb = Feedback.objects.create(
        meal=fb_data['meal'],
        student=fb_data['student'],
        rating=fb_data['rating'],
        issue_tags=fb_data['issues'],
        positive_tags=fb_data['positives'],
        custom_remark=fb_data['remark'],
        status='ANALYZED',
        is_anonymous=(fb_data['rating'] <= 2)
    )

    # Attach Media if downloaded
    img_key = fb_data.get('image')
    if img_key and img_key in downloaded_files:
        rel_path = downloaded_files[img_key]
        FeedbackMedia.objects.create(
            feedback=fb,
            media_type='IMAGE',
            file=rel_path,
            metadata={'label': img_key}
        )

    # Attach Analysis
    FeedbackAnalysis.objects.update_or_create(
        feedback=fb,
        defaults={
            'language': 'en',
            'transcript': fb.custom_remark,
            'sentiment': fb_data['sentiment'],
            'severity': fb_data['severity'],
            'themes': fb_data['themes'],
            'summary': fb_data['summary'],
            'provider': 'Groq',
            'model': 'openai/gpt-oss-20b'
        }
    )

    # Attach AI Insight if critical
    if fb_data.get('insight'):
        AIInsight.objects.create(
            insight_type='Safety/Quality Alert',
            title=f"Alert: {fb_data['issues'][0] if fb_data['issues'] else 'Kitchen Concern'}",
            summary=fb_data['insight'],
            evidence={'feedback_id': fb.id, 'tags': fb.issue_tags, 'remark': fb.custom_remark},
            severity='CRITICAL',
            date=today
        )

# 3. DAILY DIGEST
print("[+] Generating comprehensive Daily Digest...")
DailyDigest.objects.update_or_create(
    date=today,
    defaults={
        'overview': f"Today's dining sessions recorded high engagement across all meals. While breakfast dosas and dinner biryani received glowing praise, three critical contamination and temperature alerts require immediate kitchen supervisor attention.",
        'response_count': Feedback.objects.filter(created_at__date=today).count(),
        'average_rating': 3.4,
        'positive_signals': [
            'Live griddle dosa station rated 4.8/5 by morning diners',
            'Cardamom chai and hot evening samosas received high student satisfaction',
            'Counter serving efficiency praised during peak lunch rush'
        ],
        'top_issues': [
            'Foreign object report in cabbage salad requires thorough vegetable wash audit',
            'Evening snack counter experienced stock out within 25 minutes',
            'Lukewarm dal temperatures reported during second lunch shift'
        ],
        'recommendations': [
            'Mandate double-washing of leafy greens and inspect salad prep station daily',
            'Increase snack batch quantity by 25% on peak academic days',
            'Enforce hot water bain-marie checks at 1:15 PM to keep dal above 65°C'
        ]
    }
)

# 4. COMMUNITY POSTS & POLLS
print("[+] Adding community discussions and polls...")
post1, _ = CommunityPost.objects.get_or_create(
    title="How was the Sunday Dum Biryani Feast?",
    content="Hey everyone! The mess committee made changes to the biryani recipe this week based on student votes. Share your honest thoughts below!",
    author=students[0],
    post_type='FOOD_POST',
    status='ACTIVE'
)
CommunityComment.objects.get_or_create(
    post=post1,
    author=students[1],
    defaults={'content': 'Loved the aroma and spices this time! Much better than last week.'}
)
CommunityComment.objects.get_or_create(
    post=post1,
    author=students[2],
    defaults={'content': 'Flavor was 10/10, just hope we get a bit more raita next time.'}
)

# Poll post
post2, _ = CommunityPost.objects.get_or_create(
    title="Poll: Pick Next Sunday's Dessert Special!",
    content="Vote for your top dessert pick to be served with dinner next Sunday.",
    author=students[3 % len(students)],
    post_type='POLL',
    status='ACTIVE'
)
poll, _ = Poll.objects.get_or_create(
    post=post2,
    defaults={'question': 'Which sweet do you prefer for Sunday Special?'}
)
options = ['Hot Gulab Jamun with Rabri', 'Chilled Rasmalai', 'Warm Brownie with Ice Cream', 'Kesar Phirni']
for opt_text in options:
    PollOption.objects.get_or_create(poll=poll, text=opt_text)

print("[SUCCESS] Meaningful university mess database seeding complete!")
