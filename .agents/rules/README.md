----
title: Agent Safety Rules Index
summary: An index containing a list of agent rules files.
----

# Safety Rules

This directory contains all the project safety rules.  Files will be named `<rule index number>-<rule name>.md` and will contain both the rule and the frontmatter metadata for said rule.

## Severity Legend

Each rule declares a `severity` in its frontmatter, describing how strictly agents must follow it:

| Severity | Meaning |
|----|----|
| `must` | **Hard guardrail.** Violating this rule risks harm to the project or its data. Agents must not proceed in conflict with it; when in doubt, stop and ask. |
| `should` | **Best practice.** Agents are expected to follow this by default, but may deviate when a specific task justifies it, as long as the deviation is called out. |

When rules conflict, `must` rules take precedence over `should` rules.

## Index

| File | Rule |
|----|----|
| [01-code-modification-safety.md](./01-code-modification-safety.md) | Code Modification Safety |
| [02-command-execution-safety.md](./02-command-execution-safety.md) | Command Execution Safety |
| [03-secrets-credential-safety.md](./03-secrets-credential-safety.md) | Secrets and Credential Safety |
| [04-code-quality-standards.md](./04-code-quality-standards.md) | Code Quality Standards |
| [05-communication-protocol.md](./05-communication-protocol.md) | Communication Protocol |
| [06-task-scoping-boundaries.md](./06-task-scoping-boundaries.md) | Task Scoping and Boundaries |
