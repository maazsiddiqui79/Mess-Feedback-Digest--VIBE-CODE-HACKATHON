# MessMind AI — Master Build Instructions

## Highest-Priority Engineering Rule

**Correctness is more important than speed, feature count, visual polish, or implementation convenience.**

For every feature that is implemented:

1. Implement it completely.
2. Implement the normal flow.
3. Implement validation.
4. Implement authorization.
5. Implement loading states.
6. Implement empty states.
7. Implement error states.
8. Handle network/API failures.
9. Handle invalid, missing, duplicate, stale, malformed, oversized, and unexpected input.
10. Handle relevant race conditions and repeated submissions.
11. Handle database consistency and transaction boundaries where required.
12. Verify persistence.
13. Verify frontend/backend integration.
14. Verify permissions.
15. Verify edge cases.
16. Test the feature before considering it complete.

**A partially working feature is worse than a smaller number of fully working features.**

Never mark a feature complete merely because its happy path works.

## Anti-Shortcut Rule

Do not:

- fake backend functionality with frontend state
- hardcode analytics
- use fake AI output where real AI integration is required
- create buttons that do nothing
- create pages that only look functional
- swallow errors silently
- assume uploads always succeed
- assume APIs always respond successfully
- assume users always provide valid input
- trust frontend permissions
- duplicate records because a request was submitted twice
- lose user input after a recoverable error
- expose private data through unauthorized endpoints

## Scope Control

Implement only documented requirements.

Do not add speculative features.

Do not add unnecessary libraries, abstractions, services, files, components, endpoints, models, comments, or code.

Use the minimum code necessary for a robust implementation.

## Existing Code

Before changing existing code:

1. Read it.
2. Understand it.
3. Preserve working behavior.
4. Change only what is required.
5. Re-test affected functionality.

Do not rewrite working code just for style.

## Comments

Use minimal comments.

Only comment genuinely non-obvious reasoning.

Never comment obvious code such as imports, API calls, component rendering, or CRUD operations.

## Definition of Done

A feature is complete only when:

- happy path works
- validation works
- permissions work
- persistence works
- API integration works
- loading/error/empty states work
- relevant edge cases work
- repeated actions are safe
- production build has no relevant errors
- acceptance criteria pass

If a requirement cannot be implemented reliably, do not fake it. Report the exact blocker and implement the safest documented fallback only if the specification permits it.
