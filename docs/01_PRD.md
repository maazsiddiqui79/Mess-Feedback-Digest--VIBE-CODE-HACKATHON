# MessMind AI — Product Requirements Document

## Product

MessMind AI is an AI-powered campus mess feedback, community, moderation, and operational intelligence platform.

## Core Problem

A hostel/campus mess may serve hundreds of students across multiple meals every day. Feedback arrives through verbal complaints, messages, comments, and informal conversations. Managers cannot efficiently process all of it.

## Critical Constraints

- Normal student feedback: under 10 seconds.
- Manager daily digest: readable in under 2 minutes.
- AI must create useful structured intelligence, not decorative chatbot output.
- Admin/manager remains the human decision maker.

## Primary Users

### Student
Provides meal feedback and participates in the food community.

### Mess Manager
Reviews feedback, trends, AI insights, recommendations, and actions.

### Moderator
Reviews community reports and moderation queues.

### Admin
Manages users, content, meals, analytics, AI insights, actions, and audit logs.

### Super Admin
Has complete administrative control.

## Core Product Loop

Student feedback
→ validation
→ duplicate/spam protection
→ AI understanding
→ structured intelligence
→ daily digest
→ evidence-backed recommendation
→ human decision
→ action
→ outcome measurement

## P0 Reliability Requirement

Every implemented capability must be robust and edge-case aware.

For every feature, explicitly handle where applicable:

- missing data
- invalid data
- unauthorized access
- expired authentication
- duplicate requests
- repeated clicks
- network failure
- backend failure
- database failure
- AI timeout/failure
- malformed AI response
- file upload failure
- unsupported media
- oversized media
- deleted/archived records
- concurrent updates
- stale frontend state
- empty results
- pagination boundaries
- rate limiting
- retry behavior
- partial failure

Do not allow an edge case to silently corrupt data.

## Student Feedback

Students can:

- see current meal
- give one-tap rating
- select multiple issue tags
- select positive tags
- add custom text remark
- record voice
- upload image
- upload short video
- choose community anonymity where applicable
- submit feedback
- view their own feedback history

Optional fields must remain optional.

## Rating

1 — Terrible
2 — Poor
3 — Okay
4 — Good
5 — Excellent

## Issue Categories

- Taste
- Too salty
- Too spicy
- Too oily
- Food quality
- Too cold
- Too hot
- Quantity
- Variety
- Hygiene
- Cleanliness
- Waiting time
- Queue
- Service
- Food availability
- Price
- Other

## Positive Categories

- Taste
- Quantity
- Variety
- Freshness
- Hygiene
- Service
- Presentation
- Temperature
- Other

## Adaptive Feedback

If a student selects a relevant issue, optional follow-up questions may appear.

Do not turn the 10-second flow into a long mandatory form.

## Media

Supported feedback media:

- text
- audio
- image
- short video

Media must have:

- type validation
- size validation
- duration validation where applicable
- secure storage
- upload progress where practical
- retry/error handling
- preview
- deletion/replacement rules
- authorization checks

## AI Analysis

Where applicable, analyze:

- language
- transcript
- sentiment
- themes
- severity
- issue classification
- positive aspects
- summary
- duplicate probability
- moderation status
- confidence/evidence strength

AI failure must not cause loss of the original feedback.

Original feedback must remain usable even if AI analysis fails.

## Duplicate Protection

Prevent repeated feedback from the same student for the same meal within the defined policy window.

Use:

- student
- meal
- time window
- semantic similarity where applicable

Handle race conditions so simultaneous submissions cannot bypass the protection.

## Daily AI Digest

Show:

- response count
- average rating
- top negative issues
- positive signals
- emerging issues
- anomalies
- recurring issues
- recommended actions
- evidence

The digest must be generated from actual stored data.

If AI generation fails, show a safe deterministic analytics summary rather than a broken screen.

## AI Evidence

Every important insight should provide measurable evidence such as:

- related feedback count
- historical baseline
- percentage change
- meal concentration
- time concentration
- severity distribution

Never fabricate evidence.

## AI Recommendations

AI recommends.

Admin/manager decides.

Recommendations must never silently execute operational actions.

## Action Tracking

Actions include:

- problem
- recommendation
- owner
- status
- created date
- target date
- notes
- outcome

Statuses:

- Open
- In Progress
- Monitoring
- Resolved
- Closed

## Intervention Measurement

Compare appropriate before/after metrics.

Use cautious language such as:

"The issue appears to be improving."

Do not claim causal proof from simple before/after correlation.

## Analytics

Support:

- meal rating trends
- daily trends
- weekly trends
- issue trends
- sentiment trends
- severity trends
- anomalies
- meal comparison
- time patterns
- recurring issues

## Community

Students can:

- create posts
- comment
- react
- create polls
- vote
- report content
- share food opinions
- share suggestions
- share food photos/videos where permitted

Post types:

- Discussion
- Recommendation
- Issue
- Suggestion
- Food Post
- Poll

## Community Moderation

AI can classify content as:

- ALLOW
- REVIEW
- BLOCK

AI moderation must not silently override final administrative control.

Handle:

- spam
- duplicates
- abusive content
- harassment
- inappropriate content
- threats
- personal information exposure
- malicious links where relevant

## Administration

Admins can manage:

- student accounts
- feedback
- media
- community
- reports
- meals
- AI insights
- actions
- notifications
- audit logs
- system settings

Sensitive administrative actions must be auditable.

## Privacy

Protect:

- student private information
- private feedback
- uploaded media
- voice recordings
- account information

Never expose private records through public/community endpoints.

## Success Metrics

- feedback completion time
- feedback participation
- duplicate rejection rate
- AI analysis success rate
- issue detection
- manager reading time
- action completion
- issue improvement after intervention
- community engagement
