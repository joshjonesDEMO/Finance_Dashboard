# Backend standards (Bugbot)

Nested rules for code under `backend/`. Bugbot walks up from changed files and
merges this file with the repo root `.cursor/BUGBOT.md`.

## Reliability

- Retry loops must have a bounded maximum attempt count and backoff between
  tries. Never use unbounded `while (true)` around network calls.
- Validate nullable API responses before dereferencing fields.

## API clients

- All outbound requests must read credentials from environment variables, never
  inline strings.
- Log request failures with enough context to debug, but never log secrets.

## Tests

- New modules under `backend/lib/` require Vitest coverage before merge.
