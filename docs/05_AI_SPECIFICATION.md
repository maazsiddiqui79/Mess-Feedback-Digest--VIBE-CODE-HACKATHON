# AI Specification

## Highest-Priority AI Reliability Rule

AI is an external dependency and can fail.

The application must remain correct and usable when AI is:

- unavailable
- slow
- rate limited
- malformed
- inconsistent
- partially successful
- unavailable for one media type

Never lose original user data because AI failed.

## Feedback Pipeline

Raw feedback
→ persist original data
→ preprocessing
→ language detection
→ transcription if audio
→ media analysis if applicable
→ sentiment
→ themes
→ severity
→ duplicate analysis
→ structured result

## Structured Output

Prefer schema-constrained JSON.

Expected fields where applicable:

- language
- transcript
- sentiment
- severity
- themes
- issue
- positive_aspects
- summary
- confidence
- evidence

Validate the AI response before saving it.

If validation fails:
- preserve original feedback
- record AI failure
- allow retry
- show safe UI state

## Text

Analyze:
- language
- sentiment
- themes
- issue
- severity
- concise summary

Handle:
- empty text
- extremely long text
- emojis
- spelling errors
- Hinglish
- multilingual text
- abusive text
- irrelevant text

## Voice

Audio
→ speech-to-text
→ language detection
→ normalized text
→ AI analysis

Handle:
- silent audio
- unsupported format
- excessive duration
- noisy audio
- unintelligible speech
- transcription timeout
- provider failure

Preserve the uploaded audio even if transcription fails.

## Image

Use vision analysis to identify potential contextual issues.

Use cautious wording.

Correct:
"Potential hygiene concern detected."

Incorrect:
"This food is contaminated."

Handle:
- unsupported file
- oversized file
- corrupted file
- no detectable content
- ambiguous image
- inappropriate image

## Video

For short videos:
- validate format
- validate size
- validate duration
- extract relevant audio/transcript where supported
- inspect relevant visual information where supported

Do not claim certainty beyond available evidence.

If video AI processing fails, the video should still remain accessible to authorized reviewers.

## Sentiment

Possible values:

POSITIVE
NEUTRAL
NEGATIVE
MIXED

## Severity

LOW
MEDIUM
HIGH
CRITICAL

Severity must not be presented as objective truth when the evidence is ambiguous.

## Duplicate Detection

Use:
- student
- meal
- time window
- semantic similarity

Handle:
- exact duplicate
- paraphrased duplicate
- multilingual duplicate
- repeated click
- concurrent requests

Do not reject legitimate distinct feedback merely because it shares a common phrase.

## Daily Digest

Generate:

- overview
- response count
- average rating
- positive signal
- top issues
- emerging issue
- anomaly
- recurring issue
- recommended action

The digest must be based on real data.

If LLM generation fails:
- show deterministic statistics
- clearly indicate that AI narrative is unavailable
- allow retry

## AI Evidence

Never fabricate:
- counts
- percentages
- baselines
- trends
- supporting comments

Evidence must be derived from actual database queries.

## Recommendations

AI can recommend.

Human decides.

Never automatically:
- suspend a student
- delete content
- change menu
- punish staff
- close an incident
- mark a safety issue resolved

unless an explicit deterministic administrative rule permits it.

## AI Confidence

Confidence must represent evidence strength.

Do not present arbitrary model confidence as a scientific probability.

## Community Moderation

Classify:

ALLOW
REVIEW
BLOCK

Handle false positives through moderator review.

Students should have a report/review path where appropriate.

## AI Rate Limits and Retries

Retries must be bounded.

Do not create infinite retry loops.

Retry only operations that are safe to repeat.

Use backoff where appropriate.

## AI Auditability

Store enough metadata to identify:
- provider
- model
- timestamp
- analysis status
- retry status

Do not store provider secrets.
