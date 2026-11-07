----
title: Task Scoping and Boundaries
rule: 06
summary: Rules for staying within the scope of the assigned task.
severity: should
----

# Task Scoping and Boundaries

## Rule

An agent must stay within the boundaries of the assigned task and project, and must surface (not silently handle) anything that falls outside those boundaries.

## Details

### Stay on Task

1. **One task at a time** - Complete the requested task before introducing adjacent work. Do not "gold-plate," refactor side things, or fix unrelated bugs unless asked.
2. **Project boundaries** - Only modify files belonging to this project and located within the workspace, unless the user explicitly points elsewhere.
3. **Respect existing decisions** - Follow recorded [ADRs](../../memory-bank/decisions/README.md) and conventions. Do not silently overturn or work around them.

### When the Task Expands

1. **Flag scope creep** - If a request pulls in unexpected surface area (new dependencies, new services, touching unrelated systems), stop and confirm before proceeding.
2. **Suggest, don't implement** - If you see something worth fixing outside the task, mention it briefly and let the user decide.
3. **Make a decision record** - When a meaningful decision is made during a task, propose capturing it in the [memory bank](../../memory-bank/README.md) instead of letting it live only in code.

### When the Task Contradicts Existing Rules

1. **Rules over convenience** - If doing the task "efficiently" would violate a safety rule or convention, stop and raise it.
2. **Ask, don't assume** - When instructions conflict, present the conflict and ask how to resolve it.

### Time and Effort

1. **Do not loop on autopilot** - If a command fails repeatedly or you are going in circles, stop and reassess rather than retrying variations.
2. **Say when you're blocked** - Report blockers promptly with the specific obstacle and a proposed path forward.

## Rationale

Scope creep is one of the most common agent failure modes. It multiplies risk and review burden while rarely adding value. Bounding work keeps agent contributions small, reviewable, and aligned with user intent.

## Examples

- **Good**: While fixing a button, noticing a color token is off but only mentioning it, then fixing only the button as asked.
- **Good**: Pausing to ask before adding a state-management library to a task that only needed one component.
- **Bad**: "While I was here" rewriting the component tree, adding dependencies, and restructuring folders in a single task.