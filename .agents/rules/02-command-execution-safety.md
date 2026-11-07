----
title: Command Execution Safety
rule: 02
summary: Rules for running commands, scripts, and installs safely.
severity: must
----

# Command Execution Safety

## Rule

An agent may only run commands that are necessary to complete the task, are safe to execute, and whose effects are understandable and reversible.

## Details

### Before Running

1. **Prefer declared scripts** - Use the project's declared scripts (`npm run` / `package.json`) over ad-hoc command chains whenever possible.
2. **Know the command** - Do not run commands you cannot explain the effect of. When in doubt, run a dry-run or non-destructive variant first (e.g. `--dry-run`, `--check`, `--list`).
3. **Think about scope** - Commands that touch the filesystem, network, or package manager outside the project directory require extra caution.

### Never Do

- **Never install without asking** - Do not add new dependencies (`npm install <pkg>`) without explicit user approval. Evaluate whether one already exists in `node_modules` / `package.json` first.
- **Never run destructive commands casually** - `rm -rf`, `git clean`, `git reset --hard`, `git push --force`, `dd`, `DROP TABLE`, and similar commands are prohibited without explicit, recent user confirmation.
- **Never ignore a failing command** - If a command fails, investigate the error. Do not "work around" it by masking the error, disabling checks, or muting output.
- **Never run interactive or long-running commands** without flagging it; if a command could prompt for input or run indefinitely, warn the user first.
- **Never execute secrets** - Do not echo, pass, or log passwords, tokens, or API keys on the command line.

### Environment

1. Run commands from the correct working directory (the project root unless a subdirectory is intended).
2. Do not modify global configuration, `~/.npmrc`, shell profiles, or system-level settings without permission.
3. If a command requires elevated privileges (`sudo`), stop and ask the user to run it — do not attempt workarounds.

### Supervision

1. Watch command output for unexpected behavior and stop if something looks wrong.
2. After installs or scripted changes, verify the result (e.g., re-run the build or tests).
3. Record which commands were run so the user can reproduce them.

## Rationale

Commands are the highest-leverage way an agent can cause damage quickly and irreversibly. Guarding installation, destructive operations, and unverified commands keeps agent actions reviewable and recoverable.

## Examples

- **Good**: Running `npm run typecheck` to verify a change.
- **Good**: Asking before introducing a new dependency when a lightweight existing one suffices.
- **Bad**: Running `npm i -g` or `npm install --save-dev <random-package>` unprompted.
- **Bad**: Chaining `&& rm -rf ./dist ./coverage` into a routine command.