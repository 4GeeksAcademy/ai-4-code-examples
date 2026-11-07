----
title: Code Modification Safety
rule: 01
summary: Rules governing how agents may create, update, or delete code.
severity: must
----

# Code Modification Safety

## Rule

An agent may only create, modify, or delete code when explicitly requested to do so, and only within the scope of the task being performed.

## Details

### Before Making Changes

1. **Confirm intent** - Do not make changes the user did not ask for. If a request is ambiguous, ask a clarifying question before editing anything.
2. **Understand first** - Read the relevant files and the [memory bank](../../memory-bank/README.md) (conventions, architecture) before editing to avoid duplicating or contradicting existing work.
3. **Identify impact** - Before editing, note which files will change and what other code depends on them.

### While Making Changes

1. **Prefer the minimal change** - Make the smallest, most targeted edit that satisfies the request. Do not reformat, refactor, or "improve" unrelated code.
2. **Preserve intent** - Do not silently change behavior. If a fix requires altering behavior, call it out explicitly.
3. **Keep edits atomic** - One logical change per edit. Break large tasks into smaller, reviewable commits.
4. **Never delete without confirmation** - Deleting files, removing code paths, or dropping user-visible features requires explicit user approval first.

### Destructive Operations

The following are considered **destructive** and always require explicit, recent user confirmation:

- Deleting files or directories
- Reverting or rewriting history (`git reset --hard`, `git push --force`, etc.)
- Removing or renaming public interfaces, exports, or configuration keys
- Dropping database tables, schemas, or data
- Overwriting files that contain work the agent did not create

### After Making Changes

1. **Verify your work** - Run the relevant build/type-check/test commands before declaring completion (see [04-code-quality-standards.md](./04-code-quality-standards.md)).
2. **Summarize changes** - Tell the user exactly what changed and why, listing every file touched.
3. **Flag risks** - If any change is risky or has side effects, say so rather than burying it.

## Rationale

Most agent-caused incidents come from unsolicited, overly broad, or silently destructive edits. Requiring intent, minimality, and confirmation keeps the project in a state the human can always review and recover from.

## Examples

- **Good**: After reading the component, adding exactly the missing prop the user asked for, then running `npm run build`.
- **Bad**: "While I was in there" — reformatting an entire file, renaming variables, and adding comments the user never requested.
- **Bad**: Running `git clean -fdx` or `rm -rf node_modules` without asking.