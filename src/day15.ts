import { loadInput } from "./utils";
import PriorityQueue from "ts-priority-queue";
import * as itertools from "itertools";

// Singleton to provide the modification values for moving from one
// state to the next. Takes into account the # of ingredients
class Modifiers {
  private static modifiers: number[][];
  private static ready = false;

  // Must be called before this can be used
  public static init(n: number) {
    const modifierChars = [-1, 1];
    const seen = new Set<String>();
    const modifiers: number[][] = [];

    // This basically will result in deltas to be applied,
    // since each state must sum to 100 units total
    // examples: [1, -1, 0, 0] or [0, 1, -1, 0]
    for (const combo of itertools.permutations(
      modifierChars.concat(
        "0"
          .repeat(n - 2)
          .split("")
          .map(s => Number.parseInt(s))
      )
    )) {
      // The permutations library will treat 0 and 0 as different
      // even though they have the same meaning. Using the set to trim
      // down to only materially different combos
      const str = combo.toString();

      if (!seen.has(str)) {
        seen.add(str);
        modifiers.push(combo);
      }
    }

    // Save it off so we don't have to recompute this
    Modifiers.modifiers = modifiers;
    this.ready = true;
  }

  // Helper to get the list and help make sure you called
  // init already ...
  public static get() {
    if (!this.ready) {
      throw new Error("Not inited. Call Modifiers.init() first");
    }
    return Modifiers.modifiers;
  }
}

// Format for entries in the open queue
interface StateWithScore {
  score: number;
  state: number[];
  calories: number;
}

// This method takes a list of the ingredients, a fitness function
// to determine the order in the priority queue, and a boolean to
// indicate if this is part 1 or 2 and therefore does having exactly 500
// calories matter. (This affects what states qualify for future examination)
export function findOptimalSolution(
  ingredients: Ingredient[],
  fitnessFunc: (a: StateWithScore, b: StateWithScore) => number,
  mustHave500Cals: boolean
): number {
  // Set up our priority queue with the provided fitness function
  const open = new PriorityQueue({ comparator: fitnessFunc });

  // Use a set to track examined states efficiently
  const closed = new Set();

  // Determine some default starting values based on number of ingredients
  // This behavior is dumb, just takes 100 / n to get a starting value that
  // makes them all balanced and then applies it. Like for 4 ingredients,
  // the starting position would be 100 / 4 = 25 => [25, 25, 25, 25]
  const startVal = 100 / ingredients.length;
  const startState: number[] = [];
  ingredients.forEach(i => startState.push(startVal));

  let startScore = computeValueOfState(ingredients, startState);
  let startCals = computeCalorieCount(ingredients, startState);

  // And queue up the first entry
  open.queue({
    score: startScore,
    state: startState,
    calories: startCals
  });

  // Track the best score we've seen and whether or not we've gotten
  // into the ballpark of 500 calories yet. This is important because
  // it can take a while to get your first hit at 500 even, but once you're
  // there you don't want to continue exploring forever outside of that
  // range, or you'll end up searching the entire space
  let bestFound = startScore;
  let bestRecipe: number[] = [];
  let foundFirst500 = false;

  // Now let's get down to work...
  let count = 0;
  while (open.length > 0) {
    count++;

    // Get all the next states from the current head
    const states = findValidNextSteps(open.peek().state);

    // Move the head to the closed list since we've got all its states now
    closed.add(open.dequeue().state.toString());

    // Process each possible future state for quality
    for (let state of states) {
      // First thing, bail if we've seen it before
      if (!closed.has(state.toString())) {
        // Then calculate score and calorie count
        let score = computeValueOfState(ingredients, state);
        let cals = computeCalorieCount(ingredients, state);

        // If the score is better than we've seen, let's update and
        // store it so we can explore its children. (This is basically
        // how we know if we're moving in the right direction or not)
        if (score >= bestFound) {
          // The case where we need to match 500 exactly is more tricky
          // so handle that separately.
          if (mustHave500Cals) {
            // We only want to save best scores if calories are exactly 500
            // and we also want to know when we've finally gotten into the
            // vicinity, so we can stop blindly searching the whole space
            if (cals == 500) {
              foundFirst500 = true;
              bestFound = score;
            }

            // If we haven't hit 500 yet, store everything, otherwise, only store
            // new states that are exactly 500.
            if (!foundFirst500 || (foundFirst500 && cals == 500)) {
              open.queue({ score: score, state: state, calories: cals });
            }
          } else {
            // And now the simple case where we don't care about 500, just store everything
            // since we're getting warmer with this state and maybe its children are even bette
            bestFound = score;
            bestRecipe = state;
            open.queue({ score: score, state: state, calories: cals });
          }
        }
        // Debug: If you need to see what's happening at each step
        // console.log(
        //   `End of ${count}. Best: ${bestFound}, score: ${score}, cals: ${cals}, open len: ${open.length}, closed len: ${closed.size}`
        // );
      }
    }
  }

  // Debug: If you want to see total iterations needed
  console.log(`Iterations: ${count}, Best recipe: ${bestRecipe}`);
  return bestFound;
}

// This is the crux of the search algorithm, this function takes
// a given state, and transforms it with all the possible next
// steps from the Modifier list and returns them
function findValidNextSteps(state: number[]): number[][] {
  // console.log("find next state, start: ", state);
  const options: number[][] = [];

  for (const combo of Modifiers.get()) {
    // Make a copy, modify each index according to the delta recipe
    const o = state.slice();
    for (let i = 0; i < state.length; i++) {
      o[i] = state[i] + combo[i];
    }

    // Then save it
    options.push(o);
  }

  return options;
}

// This is a helper method to calculate the current score of the given state
function computeValueOfState(
  ingredients: Ingredient[],
  state: number[]
): number {
  let capacity = 0;
  let durability = 0;
  let flavor = 0;
  let texture = 0;

  for (let i = 0; i < state.length; i++) {
    capacity += ingredients[i].capacity * state[i];
    durability += ingredients[i].durability * state[i];
    flavor += ingredients[i].flavor * state[i];
    texture += ingredients[i].texture * state[i];
  }

  // Technically the rules say to treat anything negative as 0,
  // but since we're sorting on this value, having the proper negative
  // numbers helps to properly evaluate just how far from the target
  // a particular state really is, and gets it searched less.
  return capacity * durability * flavor * texture;
}

// This is a helper to calculate the calorie count for a particular recipe
function computeCalorieCount(
  ingredients: Ingredient[],
  state: number[]
): number {
  let calories = 0;

  for (let i = 0; i < state.length; i++) {
    calories += ingredients[i].calories * state[i];
  }

  return calories;
}

// Store all the info about a particular ingredient
export class Ingredient {
  name: string;
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
  calories: number;

  constructor(
    name: string,
    capacity: number,
    durability: number,
    flavor: number,
    texture: number,
    calories: number
  ) {
    this.name = name;
    this.capacity = capacity;
    this.durability = durability;
    this.flavor = flavor;
    this.texture = texture;
    this.calories = calories;
  }
}

// Parse the input lines into ingredients
function parseInput(lines: string[]): Ingredient[] {
  const result: Ingredient[] = [];

  lines.forEach(line => {
    const tokens = line
      .replace(":", "")
      .replace(",", "")
      .split(/\s+/);
    const name = tokens[0];

    result.push(
      new Ingredient(
        tokens[0],
        Number.parseInt(tokens[2]),
        Number.parseInt(tokens[4]),
        Number.parseInt(tokens[6]),
        Number.parseInt(tokens[8]),
        Number.parseInt(tokens[10])
      )
    );
  });

  return result;
}

if (require.main === module) {
  // Let's do this! Grab all the input data
  const lines = loadInput(15).filter(l => l != "");
  // Example input if you want to test with that
  // const lines = [
  //   "Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8",
  //   "Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3"
  // ];

  const ingredients = parseInput(lines);

  // Now that we know how many ingredients there are, init the modifiers
  Modifiers.init(ingredients.length);

  // This is how we'll sort the priority queue for part 1. in order by score.
  const part1FitnessFunc = (a: StateWithScore, b: StateWithScore) =>
    b.score - a.score;

  const part1 = findOptimalSolution(ingredients, part1FitnessFunc, false);
  console.log(`Part 1: ${part1}`);

  // This is how we'll sort the priority queue for part 2, in order by score
  // with score being reduced for being farther away from 500
  const part2FitnessFunc = (a: StateWithScore, b: StateWithScore) => {
    const aScore = Math.abs(500 - a.calories) * a.score;
    const bScore = Math.abs(500 - b.calories) * b.score;
    return aScore - bScore;
  };

  const part2 = findOptimalSolution(ingredients, part2FitnessFunc, true);
  console.log(`Part 2: ${part2}`);
}
