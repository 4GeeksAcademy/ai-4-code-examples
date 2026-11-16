---
name: roll-dice
description: A simple skill for an agent to roll dice.
title: Roll Dice Skill
summary: A demonstration skill that shows students how agents execute dice rolls using a small TypeScript utility.
author: dotfortun
created: 2026/11/13
updated: 2026/11/13
state: draft
---

# Roll Dice Skill

A simple, self-contained skill that teaches agents how to roll dice on a user's behalf.  It is designed as a minimal demo for students learning how skills, scripts, and agent behavior fit together.

## Overview

When a user asks for a dice roll (e.g., "roll a d20" or "roll 3d6 + 2"), the agent should call the functions in `scripts/diceroll.ts` to produce a result and then present it back to the user.

This skill demonstrates three things:

1. **A SKILL.md** — the instruction file the agent reads to learn how to behave.
2. **A supporting script** (`diceroll.ts`) — the actual logic, written in TypeScript, that performs the rolls.
3. **The agent loop** — how the agent parses the request, selects the right function, executes it, and responds.

## Usage

### When to trigger this skill

Activate this skill whenever the user:

- Asks you to roll one or more dice ("roll a d20", "roll 2d6", "give me a d100")
- Asks for a die roll with a modifier ("roll 1d20 + 4", "3d6 - 1")
- References dice in a common dice-notation format (`ndx`, `ndx + y`, or `ndx - y`)
- Uses natural language that implies a dice roll ("roll for initiative", "make a saving throw")

### How to invoke the script

Dice rolls are handled by the functions exported from `scripts/diceroll.ts`:

| Function | Purpose |
|----|----|
| `roll_single_die(n)` | Rolls one die with `n` sides (defaults to 6). Returns a value from 1 to `n`. |
| `roll_many_dice(to_roll)` | Rolls multiple groups of dice (with optional modifiers) and returns the **sum**. |

#### Rolling a single die

```typescript
import { roll_single_die } from './scripts/diceroll.ts';

const result = roll_single_die(20); // returns 1–20
```

#### Rolling multiple dice / groups

```typescript
import { roll_many_dice } from './scripts/diceroll.ts';

const to_roll = [
    { sides: 6, count: 2, modifier: 0 }, // 2d6
    { sides: 20, count: 1, modifier: 4 }, // 1d20 + 4
];

const total = roll_many_dice(to_roll); // returns the sum of all dice and modifiers
```

### Parsing user requests

The user may express a dice roll as:

- A **single die**: "roll a d20" → `roll_single_die(20)`
- **Multiple identical dice**: "roll 3d6" → `{ sides: 6, count: 3, modifier: 0 }`
- **With a modifier**: "roll 2d6 + 4" → `{ sides: 6, count: 2, modifier: 4 }`
- **Multiple groups**: "roll 1d8 and 1d20" → two entries in the `to_roll` array

### Responding to the user

After computing the roll, respond with a clear, friendly message that includes the result.  Mirror the user's phrasing where possible.

## Function Reference

### `roll_single_die(n?: number): number`

Rolls one die with `n` sides.

| Parameter | Type | Default | Description |
|----|----|----|----|
| `n` | `number` (optional) | `6` | Number of sides on the die. Must be a positive integer. |

**Returns:** A random integer from `1` to `n`, inclusive.

**Examples:**
- `roll_single_die()` → e.g. `4` (a d6)
- `roll_single_die(20)` → e.g. `17` (a d20)
- `roll_single_die(100)` → e.g. `73` (a d100)

### `roll_many_dice(to_roll: DiceRoll[]): number`

Rolls one or more groups of dice and returns the total sum.

| Parameter | Type | Description |
|----|----|----|
| `to_roll` | `DiceRoll[]` | Array of dice groups. Each group has `sides`, `count`, and `modifier`. |

**Returns:** The sum of every die rolled, plus every modifier.

**Example:**
```typescript
const attack = roll_many_dice([
    { sides: 20, count: 1, modifier: 5 },  // d20 attack roll + 5
    { sides: 8, count: 2, modifier: 0 },    // 2d8 damage
]);
```

## Examples

### Example 1: Single die roll

> **User:** "Roll a d20 for me."
>
> **Agent:**
> ```typescript
> import { roll_single_die } from './scripts/diceroll.ts';
> const result = roll_single_die(20);
> ```
>
> **Agent response:** "You rolled a **14** on a d20!"

### Example 2: Multiple dice

> **User:** "Roll 3d6 for my character's stats."
>
> **Agent:**
> ```typescript
> import { roll_many_dice } from './scripts/diceroll.ts';
> const result = roll_many_dice([{ sides: 6, count: 3, modifier: 0 }]);
> ```
>
> **Agent response:** "You rolled **11** (3d6)."

### Example 3: Dice with a modifier

> **User:** "Make an attack roll — 1d20 + 4."
>
> **Agent:**
> ```typescript
> import { roll_many_dice } from './scripts/diceroll.ts';
> const result = roll_many_dice([{ sides: 20, count: 1, modifier: 4 }]);
> ```
>
> **Agent response:** "Your attack roll is **19** (1d20 + 4)."

### Example 4: Falling damage

> **User:** "How much falling damage do I take? Roll 12d6."
>
> **Agent:**
> ```typescript
> import { roll_many_dice } from './scripts/diceroll.ts';
> const result = roll_many_dice([{ sides: 6, count: 12, modifier: 0 }]);
> ```
>
> **Agent response:** "You take **41** falling damage."

## Safety & Best Practices

- **Randomness** — The functions use `Math.random()`, which is **not cryptographically secure**.  This is fine for a dice-rolling demo, but do not use this script for anything security-sensitive.
- **No side effects** — The functions are pure: they take input, return a number, and never write to files, make network calls, or mutate global state.
- **Keep it simple** — This is a demo skill.  Do not expand its scope with extra features (save history, weighted dice, etc.) unless explicitly asked.
- **Check the result** — After a roll, never assume the value; read what the function returned and report it to the user exactly.

## Setup & Testing

### Running the script directly

You can test the dice functions outside of an agent by running the TypeScript with `tsx`:

```bash
cd .agents/skills/roll-dice/scripts
npx tsx -e "import { roll_single_die } from './diceroll.ts'; console.log(roll_single_die(20));"
```

This should print a single integer between 1 and 20.

### Verifying the skill works

1. Run the test command above and confirm you get a number in the expected range.
2. Ask the agent to "roll a d20" and confirm it uses this skill.
3. Ask for "2d6 + 3" and manually verify the result is between **5** and **15** (min 2 + 3, max 12 + 3).

## Files in this skill

| File | Purpose |
|----|----|
| `SKILL.md` | The instruction file the agent reads to learn this skill. |
| `scripts/diceroll.ts` | The TypeScript implementation of the dice logic. |
