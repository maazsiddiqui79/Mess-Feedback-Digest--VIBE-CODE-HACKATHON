# UI/UX Specification

## Design Goal

A polished, serious SaaS product.

The interface should feel intentionally designed, not like a collection of generated pages.

## Student Mobile Priority

The feedback experience is mobile-first.

### Feedback screen

Current meal

"How was it?"

5 rating buttons

"What was wrong?"

Issue chips

"What did you like?"

Positive chips

"Tell us more"

- text
- voice
- photo
- video

Submit

Optional fields must remain optional.

## Student Navigation

- Home
- Feedback
- Community
- My Feedback
- Profile

## Feedback States

Every submission must handle:

- initial
- submitting
- success
- validation error
- network failure
- duplicate/conflict
- media upload failure
- AI processing pending
- AI processing failed

Never leave the user staring at a broken or ambiguous state.

## Community

Provide:
- feed
- categories
- post creation
- comments
- reactions
- polls
- reports
- media

Handle:
- empty feed
- loading
- pagination
- deleted post
- moderated post
- failed comment
- failed reaction
- duplicate click

## Manager

Pages:

- Dashboard
- Daily Digest
- Feedback
- Analytics
- AI Insights
- Actions
- Community
- Reports

## Admin

Pages:

- Dashboard
- Students
- Feedback
- Community
- Moderation
- AI Insights
- Meals
- Actions
- Reports
- Audit Logs
- Settings

## AI Insight Card

Show:
- title
- severity
- concise summary
- evidence
- confidence
- recommendation
- action

Do not bury important evidence behind excessive clicks.

## Charts

Charts must:
- use real data
- have loading state
- have empty state
- have error state
- handle zero values
- handle large values
- have meaningful labels

## Accessibility

Use:
- keyboard-accessible controls
- readable contrast
- visible focus
- descriptive labels
- appropriate form errors
- accessible media controls where practical

## Responsive

Student:
mobile-first

Admin/Manager:
desktop-first but responsive

## Text

Keep interface copy concise.

Avoid paragraphs when a label, number, badge, or short sentence is sufficient.
