----
title: Secrets and Credential Safety
rule: 03
summary: Rules for handling secrets, tokens, and credentials in the workspace.
severity: must
----

# Secrets and Credential Safety

## Rule

An agent must never create, store, print, transmit, or commit secrets, credentials, or personal data, and must treat any secret it encounters with maximum care.

## Details

### Handling Secrets

1. **Never log or echo** - Do not print secret values, even to "help debug." Redact them in any output or file you write.
2. **Never ask for secrets in chat tools** - When credentials are required, instruct the user to provide them in a secure channel (e.g., directly in the terminal/secret store), not through prompt-based assistants.
3. **Never hardcode** - Do not put API keys, tokens, passwords, or connection strings into source code, config files, or environment files that might be committed. Use environment variables or a secrets manager referenced via the project's existing mechanism.
4. **Do not transcribe** - Do not copy secrets between files. Move references, not values.

### In the Repository

1. **Respect ignore files** - Never commit `.env`, `.env.*`, key files, or other secret-bearing files. Confirm they are covered by `.gitignore` before committing anything.
2. **Do not use secrets currently in history** - If you find a committed secret, do not "fix History" silently; flag it to the user and recommend rotation, since past commits are publicly accessible.
3. **Treat discovered secrets as leaks** - If you encounter a hardcoded credential in the codebase, report it and recommend rotation rather than using it.

### Personal Data

1. **Minimize** - Collect and use only the personal data necessary for the task.
2. **Never aggregate** - Do not pull together personal data from multiple sources into a single file or report unless that is the explicit purpose.
3. **Respect privacy** - Do not expose personal data in logs, diffs, or generated output.

## Rationale

Secrets and personal data are the most consequential things an agent can mishandle. Because they are usually irreplaceable, the standard is prevention and reporting, not fast recovery.

## Examples

- **Good**: Referencing `process.env.VITE_API_KEY` and reminding the user to set it in their local `.env`.
- **Good**: Spotting a committed token and telling the user to rotate it.
- **Bad**: Embedding an API key in a config file to "make it work."
- **Bad**: Printing a connection string in a chat summary.