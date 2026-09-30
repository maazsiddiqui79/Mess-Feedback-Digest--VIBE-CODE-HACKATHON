# Database Schema and Integrity Rules

## User

- id
- email
- password
- role
- is_active
- created_at
- updated_at

Roles:
- STUDENT
- MANAGER
- MODERATOR
- ADMIN
- SUPER_ADMIN

Integrity:
- email must be unique
- inactive users cannot authenticate
- role changes require authorization
- sensitive changes should be auditable

## StudentProfile

- user
- student_id
- hostel
- room
- profile_image
- created_at
- updated_at

Integrity:
- user relation must be unique
- student_id should follow the institution's uniqueness rule

## Meal

- id
- name
- meal_type
- date
- start_time
- end_time
- menu_description
- is_active
- created_at
- updated_at

Integrity:
- meal_type must be valid
- date/time must be valid
- overlapping/current-meal rules must be defined
- deleted/archived meals must not break historical feedback

## Feedback

- id
- student
- meal
- rating
- issue_tags
- positive_tags
- custom_remark
- is_anonymous
- status
- created_at
- updated_at

Integrity:
- rating must be 1–5
- student must exist
- meal must exist
- tags must be valid
- ownership must be enforced
- duplicate policy must be enforced safely
- historical feedback must not disappear when a meal is archived

## FeedbackMedia

- id
- feedback
- media_type
- file
- metadata
- created_at

Integrity:
- media must belong to authorized feedback
- allowed file type
- allowed file size
- allowed video/audio duration
- failed uploads must not leave orphan metadata
- deletion must respect authorization and retention policy

## FeedbackAnalysis

- id
- feedback
- language
- transcript
- sentiment
- severity
- themes
- summary
- duplicate_score
- ai_confidence
- moderation_status
- provider
- model
- created_at
- updated_at

Integrity:
- analysis belongs to feedback
- malformed AI output must not corrupt the record
- analysis can be retried safely
- original feedback remains available if analysis fails

## CommunityPost

- id
- author
- post_type
- title
- content
- is_anonymous
- status
- created_at
- updated_at

## CommunityMedia

- id
- post
- media_type
- file
- metadata
- created_at

## CommunityComment

- id
- post
- author
- content
- status
- created_at
- updated_at

## CommunityReaction

- id
- post
- user
- reaction_type
- created_at

Important:
A user should not accidentally create unlimited identical reactions because of repeated clicks.

## Poll

- id
- post
- question
- created_at

## PollOption

- id
- poll
- text

## PollVote

- id
- poll
- option
- user
- created_at

Integrity:
- enforce the intended one-vote-per-user rule
- option must belong to the same poll

## CommunityReport

- id
- reporter
- post
- comment
- reason
- status
- reviewed_by
- reviewed_at
- created_at

Validate that a report targets a valid supported object.

## AIInsight

- id
- insight_type
- title
- summary
- evidence
- severity
- confidence
- date
- created_at

Do not store fabricated evidence.

## Action

- id
- insight
- title
- description
- owner
- status
- created_at
- target_date
- resolved_at
- updated_at

## ActionUpdate

- id
- action
- author
- note
- created_at

## Notification

- id
- user
- type
- title
- message
- is_read
- created_at

## AuditLog

- id
- actor
- action
- target_type
- target_id
- metadata
- reason
- created_at

Never store secrets or authentication tokens in audit metadata.
