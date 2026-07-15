# Emburse — backend / sync layer standards

Applies when reviewing files under `backend/`. Bugbot merges this with the repo
root `.cursor/BUGBOT.md` (walk-up from the changed file).

These paths talk to expense and transaction APIs. Reliability and credential
handling are non-negotiable.

## Reliability (blocking)

- **Bounded retries only.** Every retry loop around `fetch` or similar must
  declare a maximum attempt count and a delay/backoff between tries. Flag
  unbounded `while (true)`, infinite recursion, or “retry until success” with
  no ceiling — they can hammer vendors and hang Cloud Agents / CI.
- **Validate before use.** Treat API JSON as untrusted. Check for null /
  undefined / missing arrays before mapping amounts, merchants, or IDs.
- **Fail loudly on auth errors.** Do not swallow 401/403 into a silent retry
  loop; surface them so operators can rotate credentials.

## Credentials and egress (blocking)

- **Env-only secrets.** Authorization headers and API keys must come from
  environment variables (e.g. `process.env.EMBURSE_API_TOKEN`). Flag inline
  bearer tokens, `emb_live_*` / `sk_*` style literals, and checked-in `.env`
  contents.
- **No secret logging.** Error logs may include status codes and request IDs,
  never tokens or full response bodies that contain PII.

## Tests (blocking)

- New or changed modules under `backend/lib/` require Vitest coverage that
  exercises success, failure, and at least one retry/backoff path when retries
  exist.
- Prefer tests that assert “gives up after N attempts” over only happy-path
  mocks.

## Scope note

This tree is the integration surface for Emburse expense sync. Keep UI rendering
in `app/` / `components/`; keep network and credential logic here so Bugbot and
humans know where to look.
