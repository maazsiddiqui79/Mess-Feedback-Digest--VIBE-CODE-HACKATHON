# MessMind AI — Architecture

## Stack

Frontend:
- React
- JavaScript
- React Router
- Tailwind CSS
- Recharts where needed

Backend:
- Python
- Django
- Django REST Framework

Database:
- PostgreSQL

AI:
- LLM
- speech-to-text
- vision-capable model
- embeddings/vector similarity where needed

## Architectural Rule

The backend is the source of truth for:

- authentication
- authorization
- ownership
- feedback
- community content
- analytics
- actions
- audit logs
- AI persistence

React is not a security boundary.

## High-Level Flow

React
→ Django REST API
→ service/business layer
→ PostgreSQL
→ media storage
→ AI services
→ persisted structured results
→ React

## Django Apps

- accounts
- meals
- feedback
- media
- community
- moderation
- analytics
- ai_engine
- reports
- audit

## Reliability Architecture

### API

Every endpoint must define:

- expected request
- validation
- authentication requirement
- authorization
- success response
- expected client errors
- server error behavior

### Database

Use constraints for important invariants.

Use transactions for multi-step operations that must remain consistent.

Do not rely only on frontend validation.

### AI

AI calls are external dependencies.

Handle:

- timeout
- rate limit
- provider error
- malformed output
- unavailable provider
- partial analysis
- retry where safe

Store raw user feedback before calling AI.

AI failure must not lose the user's submission.

### Media

Do not store large binary files directly in PostgreSQL.

Store metadata in PostgreSQL and media in appropriate object/file storage.

Validate content before accepting it.

### Idempotency

Important create operations should be safe against accidental repeated requests where appropriate.

Repeated button clicks must not silently create duplicate records.

### Concurrency

Consider simultaneous:

- feedback submissions
- votes
- reactions
- admin updates
- moderation decisions
- action updates

Use database constraints or atomic operations where required.

### Pagination

List endpoints must paginate potentially large datasets.

Handle first page, middle pages, last page, and empty result sets.

### Observability

Errors should be logged with enough context to debug them without exposing sensitive user data.

Do not log passwords, tokens, or private media URLs unnecessarily.

## Frontend Architecture

Suggested structure:

frontend/src/
- components/
- pages/
- services/
- hooks/
- context/
- utils/
- assets/

Keep state local unless it genuinely needs shared/global state.

Avoid adding Redux or another large state-management system unless explicitly required.

## Backend Architecture

Suggested structure:

backend/
- config/
- accounts/
- meals/
- feedback/
- media/
- community/
- moderation/
- analytics/
- ai_engine/
- reports/
- audit/

Use serializers, permissions, models, views/viewsets, and services where they make the code clearer.

Do not create abstractions only for architectural appearance.
