# Environment and Deployment Requirements

## Environment Variables

Never hardcode secrets.

Expected categories:

- Django secret
- database URL
- AI provider API key
- storage credentials
- frontend API base URL
- allowed hosts
- CORS configuration

Use `.env` locally and secure environment configuration in deployment.

## Production Rules

- DEBUG disabled
- secure secret configuration
- restricted allowed hosts
- restricted CORS
- secure cookies/tokens according to authentication strategy
- database migrations applied
- media storage configured
- error logging enabled

## Frontend

Production build must succeed.

Frontend must use the configured backend URL.

Do not hardcode localhost URLs into production code.

## Backend

Verify:
- migrations
- static/media configuration
- database connection
- AI provider configuration
- CORS
- authentication

## Failure Behavior

If AI credentials are unavailable:
- application should still load
- feedback submission should not silently fail
- AI-specific functionality should display a clear unavailable state

If database is unavailable:
- application should show a safe service error
- do not expose stack traces

If media storage fails:
- preserve existing feedback data
- explain upload failure
- allow retry where safe
