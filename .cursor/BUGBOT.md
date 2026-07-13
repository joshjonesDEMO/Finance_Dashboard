# Emburse engineering standards (Bugbot)

These rules apply to every review in this repository. Bugbot merges them with
Team Rules, scoped-path rules, and user rules.

## Security

- Never commit hardcoded secrets, API keys, tokens, or credentials. Use
  environment variables or a secrets manager.
- Flag dynamic code execution (`eval`, `new Function`, `vm.runInContext`).

## Quality

- Backend changes under `backend/` must include or update unit tests.
- New public helpers should have JSDoc describing inputs, outputs, and failure
  modes.

## Pull requests

- Keep demo-only planted issues clearly documented in session logs; do not
  "fix" them during a live Bugbot walkthrough unless intentional.
