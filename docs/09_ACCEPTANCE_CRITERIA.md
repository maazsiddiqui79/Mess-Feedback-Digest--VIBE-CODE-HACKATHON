# Acceptance Criteria

## Critical Rule

A checkbox is not passed because the screen exists.

It is passed only when the feature works end-to-end and relevant edge cases have been tested.

## Student Feedback

[ ] Normal feedback can be completed in under 10 seconds.

[ ] Rating works.

[ ] Issue tags work.

[ ] Positive tags work.

[ ] Custom text works.

[ ] Voice recording works.

[ ] Photo upload works.

[ ] Video upload works.

[ ] Optional fields remain optional.

[ ] Validation works.

[ ] Feedback persists.

[ ] Refresh preserves persisted data.

[ ] Duplicate submission is handled.

[ ] Repeated clicks do not create unintended duplicates.

[ ] Network failure is handled.

[ ] Media failure does not corrupt feedback.

[ ] AI failure does not lose feedback.

## AI

[ ] Text analysis works.

[ ] Voice transcription works or fails gracefully.

[ ] Language detection works or fails gracefully.

[ ] Sentiment works.

[ ] Themes work.

[ ] Severity works.

[ ] Duplicate analysis works.

[ ] AI output is schema validated.

[ ] Malformed AI response does not corrupt data.

[ ] AI provider failure is handled.

[ ] AI timeout is handled.

[ ] AI retries are bounded.

[ ] AI evidence comes from real data.

[ ] No fabricated counts or percentages appear.

## Analytics

[ ] Ratings use real database data.

[ ] Trends use real database data.

[ ] Issue counts use real database data.

[ ] Sentiment trends use real database data.

[ ] Empty analytics state works.

[ ] Large datasets paginate or aggregate correctly.

[ ] Anomaly detection handles insufficient data.

## Daily Digest

[ ] Digest loads.

[ ] Digest uses real data.

[ ] Top issues are correct.

[ ] Positive signals are correct.

[ ] Evidence is visible.

[ ] Recommendation is visible.

[ ] AI failure falls back safely.

## Actions

[ ] Action creation works.

[ ] Authorization works.

[ ] Status transitions are validated.

[ ] Updates persist.

[ ] Resolved actions record resolution.

[ ] Before/after comparison works.

[ ] No unsupported causal claim is displayed.

## Community

[ ] Posts work.

[ ] Comments work.

[ ] Reactions work.

[ ] Duplicate reaction is prevented.

[ ] Polls work.

[ ] One-vote policy is enforced.

[ ] Reports work.

[ ] Media works.

[ ] Moderation works.

[ ] Deleted/moderated content has safe UI behavior.

[ ] Pagination works.

## Admin

[ ] Admin can manage students.

[ ] Account suspension works.

[ ] Account restoration works.

[ ] Feedback review works.

[ ] Media review works.

[ ] Community moderation works.

[ ] Reports work.

[ ] Meals work.

[ ] Actions work.

[ ] Analytics work.

[ ] AI insights work.

[ ] Audit logs work.

## Security

[ ] Student cannot access admin endpoint.

[ ] Student cannot access another student's private feedback.

[ ] Backend enforces ownership.

[ ] Backend enforces roles.

[ ] Suspended user cannot perform restricted actions.

[ ] Expired authentication is handled.

[ ] Media access is authorized.

[ ] Secrets are not exposed to frontend.

## Frontend

[ ] No major console errors.

[ ] No broken routes.

[ ] No dead primary buttons.

[ ] Loading states work.

[ ] Error states work.

[ ] Empty states work.

[ ] Forms preserve valid user input after recoverable failures.

[ ] Mobile student flow works.

[ ] Admin desktop flow works.

## Code

[ ] No unused imports.

[ ] No dead code.

[ ] No unnecessary dependencies.

[ ] No fake APIs.

[ ] No hardcoded analytics.

[ ] No excessive comments.

[ ] Production build succeeds.

## Final Rule

If any P0 criterion fails, do not declare the project complete.
