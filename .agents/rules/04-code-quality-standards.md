----
title: Code Quality Standards
rule: 04
summary: Rules for keeping generated code consistent with project conventions and quality bars.
severity: should
----

# Code Quality Standards

## Rule

Code written by an agent must meet the same quality bar as human-authored code: correct, idiomatic, and consistent with the project's conventions.

## Details

### Follow Project Conventions

1. **Read the memory bank first** - Check [conventions.md](../../memory-bank/conventions.md), [architecture.md](../../memory-bank/architecture.md), and [decisions](../../memory-bank/decisions/README.md) before writing code.
2. **Match the stack** - This project is React + TypeScript on Vite, styled with TailwindCSS:
   - Use the Tailwind `@theme` block in the root stylesheet for design tokens.
   - Build React features as discrete components stored in their own folders, with component styles in a paired stylesheet in the component directory.
3. **Match existing style** - Mirror the formatting, naming, and structure of neighboring files. Use the project's configured formatter (Prettier) and tooling.

### Verification

1. **Type-check** - Ensure TypeScript compiles without errors (`npm run build` or the project's typecheck script) before claiming a task is done.
2. **No new warnings** - Avoid introducing new lint or type warnings. Fix or justify them.
3. **Test where it counts** - For logic or UI behavior changes, add or update tests consistent with the project's test setup.
4. **Keep it runnable** - Never leave the app in a broken, half-migrated, or commented-out state.

### Code Review Lens

1. **Readability over cleverness** - Prefer obvious, simple code.
2. **Reuse over write** - Reuse existing utilities, constants, and components rather than duplicating them.
3. **Naming matters** - Use precise, intention-revealing names.
4. **No dead code** - Do not leave stubs, unused imports, or placeholder scaffolding.

## Rationale

Agents tend to produce acceptable-but-inconsistent code. Adhering to documented conventions and verifying with the build keeps agent output maintainable by the humans who inherit it.

## Examples

- **Good**: Adding a new UI feature as a component in its own folder with a paired stylesheet using the project's `@theme` tokens.
- **Good**: Running the type-check/build after every edit and resolving errors before handing off.
- **Bad**: Inlining styles in a giant JSX file when the convention is discrete component folders.
- **Bad**: Shipping code that compiles only with `@ts-ignore` sprinkled throughout.