/**
 * A group of dice to roll, described in dice notation (`count` dice with
 * `sides` sides each, plus a flat `modifier`).
 */
interface DiceRoll {
    /** Number of sides on each die (e.g. 6, 20, 100). */
    sides: number;

    /** How many dice in this group (e.g. 2 in "2d6"). */
    count: number;

    /** A flat bonus or penalty applied after rolling (e.g. +3, -1, 0). */
    modifier: number;
}

/**
 * Rolls a single die with `n` sides and returns the result.
 *
 * @param n - Number of sides on the die (defaults to 6 for a standard d6).
 * @returns A random integer from 1 to `n`, inclusive.
 *
 * @example
 * roll_single_die();      // returns 1-6
 * roll_single_die(20);    // returns 1-20
 * roll_single_die(100);   // returns 1-100
 */
const roll_single_die = (n: number = 6): number => {
    if (n < 1) {
        throw new Error("A die must have at least 1 side.");
    }
    return Math.floor(Math.random() * n) + 1;
};

/**
 * Rolls one or more groups of dice and returns the sum of all results.
 *
 * Each entry in `to_roll` represents a group of dice.  For example, to roll
 * "2d6 + 3" you would pass `{ sides: 6, count: 2, modifier: 3 }`.
 *
 * @param to_roll - An array of dice groups to roll.
 * @returns The sum of every die rolled plus every modifier.
 *
 * @example
 * roll_many_dice([{ sides: 20, count: 1, modifier: 5 }]); // 1d20 + 5
 * roll_many_dice([{ sides: 6, count: 2, modifier: 0 }]);  // 2d6
 * roll_many_dice([                                     // 1d8 + 2d6
 *     { sides: 8, count: 1, modifier: 0 },
 *     { sides: 6, count: 2, modifier: 0 },
 * ]);
 */
const roll_many_dice = (to_roll: DiceRoll[]): number => {
    let result: number = 0;

    for (const dice of to_roll) {
        if (dice.sides < 1 || dice.count < 1) {
            throw new Error("Each dice group needs at least 1 side and 1 die.");
        }
        for (let i = 0; i < dice.count; i++) {
            result += Math.floor(Math.random() * dice.sides) + 1;
        }
        result += dice.modifier;
    }

    return result;
};

export {
    roll_many_dice,
    roll_single_die,
};
