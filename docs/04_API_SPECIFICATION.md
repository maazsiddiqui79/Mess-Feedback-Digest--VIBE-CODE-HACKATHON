# API Specification

Base path:
`/api/`

All endpoints must have authentication and permission behavior explicitly enforced.

## Authentication

POST `/api/auth/register/`
POST `/api/auth/login/`
POST `/api/auth/logout/`
GET `/api/auth/me/`

Handle:
- invalid credentials
- inactive account
- expired token/session
- repeated login requests
- malformed input

## Meals

GET `/api/meals/`
GET `/api/meals/current/`
GET `/api/meals/{id}/`

Manager/Admin:
POST `/api/meals/`
PATCH `/api/meals/{id}/`
DELETE `/api/meals/{id}/`

Do not allow deleting a meal in a way that destroys historical feedback relationships.

## Feedback

POST `/api/feedback/`
GET `/api/feedback/`
GET `/api/feedback/{id}/`
GET `/api/feedback/my/`

Manager/Admin:
GET `/api/feedback/manager/`
PATCH `/api/feedback/{id}/status/`

Feedback creation must:
- validate rating
- validate tags
- validate ownership
- enforce duplicate policy
- persist original feedback safely
- handle repeated requests

## Feedback Media

POST `/api/feedback/{id}/media/`
DELETE `/api/feedback/media/{id}/`

Validate:
- ownership
- role
- file type
- file size
- duration where applicable

## AI

POST `/api/ai/analyze-feedback/{id}/`
GET `/api/ai/insights/`
GET `/api/ai/daily-digest/`
GET `/api/ai/weekly-report/`

AI endpoints must handle provider failures and malformed responses.

Do not expose provider secrets to React.

## Analytics

GET `/api/analytics/overview/`
GET `/api/analytics/meals/`
GET `/api/analytics/trends/`
GET `/api/analytics/issues/`
GET `/api/analytics/sentiment/`
GET `/api/analytics/anomalies/`

All analytics must be calculated from persisted data.

Handle empty datasets gracefully.

## Actions

GET `/api/actions/`
POST `/api/actions/`
GET `/api/actions/{id}/`
PATCH `/api/actions/{id}/`
POST `/api/actions/{id}/updates/`

Validate ownership and role.

Prevent invalid status transitions.

## Community

GET `/api/community/posts/`
POST `/api/community/posts/`
GET `/api/community/posts/{id}/`
PATCH `/api/community/posts/{id}/`
DELETE `/api/community/posts/{id}/`

POST `/api/community/posts/{id}/comments/`
POST `/api/community/posts/{id}/reaction/`
POST `/api/community/posts/{id}/report/`

## Polls

POST `/api/community/posts/{id}/poll/`
POST `/api/community/polls/{id}/vote/`

Enforce intended voting rules server-side.

## Admin

GET `/api/admin/students/`
GET `/api/admin/students/{id}/`
PATCH `/api/admin/students/{id}/`
GET `/api/admin/feedback/`
GET `/api/admin/community/`
GET `/api/admin/reports/`
GET `/api/admin/audit-logs/`

Never expose admin endpoints to unauthorized roles.

## Notifications

GET `/api/notifications/`
PATCH `/api/notifications/{id}/read/`

## API Error Contract

Use consistent structured errors.

Example:

{
  "error": {
    "code": "INVALID_RATING",
    "message": "Rating must be between 1 and 5.",
    "details": {}
  }
}

Do not expose stack traces or internal secrets to clients.

## Status Codes

Use appropriate HTTP status codes.

400:
validation/client input

401:
unauthenticated

403:
authenticated but unauthorized

404:
resource unavailable/not accessible

409:
conflict/duplicate where appropriate

413:
payload too large

415:
unsupported media type

429:
rate limited

500:
unexpected server error

503:
temporary external dependency unavailable
