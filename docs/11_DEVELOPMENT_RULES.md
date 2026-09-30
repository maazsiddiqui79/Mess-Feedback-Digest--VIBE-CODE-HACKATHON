# Development Rules

## Highest Priority

**Build fewer features correctly rather than many features partially.**

Every feature must be:

- complete
- integrated
- validated
- authorized
- persistent
- tested
- resilient to relevant failures
- resilient to relevant edge cases

## Before Coding

Read all documentation.

Inspect the existing repository.

Understand existing code.

Do not assume missing behavior.

## Minimal Code

Write the minimum amount of code necessary.

Do not:
- add speculative abstractions
- add unused helpers
- add duplicate utilities
- add unused models
- add unused endpoints
- add unnecessary state
- add unnecessary dependencies

## No Fake Functionality

Do not:
- fake APIs
- fake analytics
- fake AI
- hardcode production statistics
- make buttons that only display alerts
- make UI imply functionality that does not exist

## Error Handling

Never silently ignore errors.

Provide appropriate:
- user-facing message
- retry path where safe
- logging
- fallback where specified

Do not expose stack traces to users.

## Edge Cases

Before marking a feature complete, think through:

- empty input
- invalid input
- maximum input
- missing input
- duplicate request
- repeated click
- concurrent request
- unauthorized request
- expired authentication
- deleted resource
- stale resource
- network failure
- server failure
- database failure
- third-party failure
- timeout
- malformed response
- zero records
- many records
- partial success

Implement only relevant cases, but do not ignore obvious failure modes.

## Data Integrity

Never allow a failed secondary process to corrupt successful primary data.

Example:

Feedback saved successfully + AI fails
→ Feedback remains saved
→ AI status indicates failure
→ Retry is possible

## Security

Security must be implemented in Django, not merely hidden in React.

## Comments

Use minimal comments.

Comment only non-obvious reasoning.

## Testing

Test every P0 feature before moving forward.

Do not postpone all testing until the end.

## Final Audit

Before completion:

- compare against every document
- run acceptance criteria
- inspect console
- inspect server logs
- test permissions
- test media
- test AI failure
- test duplicate flows
- test empty states
- test deployment build

Do not add new functionality during final QA unless required to fix a documented defect.
