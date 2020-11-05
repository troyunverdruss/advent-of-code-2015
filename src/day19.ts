import {loadInput} from "./utils";
import PriorityQueue from "ts-priority-queue";
import {distance, closest} from 'fastest-levenshtein'

export function part1(
    molecule: string[],
    conversions: Map<string, Array<string>>
): number {
  const combos = new Set();
  // console.log("conversions", conversions);

  molecule.forEach((atom, index) => {
    const pre = molecule.slice(0, index);
    const post = molecule.slice(index + 1);
    // console.log("pre ", pre);
    // console.log("post ", post);
    conversions.get(atom)?.forEach((c) => {
      // console.log("adding: ", String(pre.join("") + c + post.join("")));
      combos.add(String(pre.join("") + c + post.join("")));
    });
  });

  return combos.size;
}

/** Wish I'd tried this first but I just kinda half assumed it wouldn't yield
 * the *shortest* path, but maybe I got lucky or maybe there's only actually
 * one path. This way works backwards instead of forwards which makes it
 * massively more efficient */
export function part2(
    molecule: string[],
    conversions: Map<string, Array<string>>
): number {
  // Reverse the conversions map
  const reverseConversions = new Map<string, string>();
  conversions.forEach((values, key) => {
    values.forEach((value) => reverseConversions.set(value, key))
  })

  let currentMolecule = molecule.join('')
  let steps = 0
  while (currentMolecule !== 'e') {
    for (const k of reverseConversions.keys()) {
      if (currentMolecule.indexOf(k) >= 0) {
        const replacement = reverseConversions.get(k)
        if (!replacement) {
          throw Error(`replacement is missing for key ${k}!!`)
        }

        if (replacement === 'e' && k.length !== currentMolecule.length) {
          continue
        }
        currentMolecule = currentMolecule.replace(k, replacement);
        steps += 1
      }
    }
  }

  return steps
}


/** This actually works, but it's way too slow for the task at hand
 * No idea where it runs out of memory, but it always does */
export function part2SearchBased(
    molecule: string[],
    conversions: Map<string, Array<string>>
): number {

  const targetMolecule = molecule.join('')
  const targetMoleculeLength = molecule.length

  const fitnessFunc = (a: StateWithScore, b: StateWithScore): number => {
    return a.score - b.score
  }

  const open = new PriorityQueue({comparator: fitnessFunc});
  const closed = new Map();
  const openSet = new Set();

  open.queue({
    score: 1,
    state: ["e"],
    steps: 0
  })
  openSet.add('e')

  let found = false;
  let foundSteps = 1000000;

  while (open.length > 0 && !found) {

    console.log(`open: ${open.length}`)
    console.log(`openSet: ${openSet.size}`)
    console.log(`closed: ${closed.size}`)

    const states = findValidNextStates(conversions, open.peek().state);

    let state = open.dequeue();
    openSet.delete(state.state.join(''))
    // console.log(state.state)
    console.log(`length: ${state.state.length}`)

    closed.set(state.state.join(''), state.steps);


    states
    .filter(s => {
      if (!closed.has(s)) {
        return true
      }

      if (closed.has(s)) {
        if (closed.get(s) > state.steps) {
          return true
        }
      }

      return false;
    })
    .filter(() => state.steps + 1 <= foundSteps)
    .filter(s => parseMoleculeString(s).length <= targetMoleculeLength)
    .forEach(s => {
      // if (state.steps + 1 === 5) {
      //   console.log(`steps 5, state: ${s}`)
      // }
      if (s === targetMolecule) {
        found = true;
        // console.log(`Found ${s} with previous state: ${state.state}, steps: ${state.steps}`);
        if (state.steps + 1 < foundSteps) {
          foundSteps = state.steps + 1;
        }
      }

      if (!openSet.has(s) && !closed.has(s)) {
        open.queue({
          score: distance(s, targetMolecule),
          state: parseMoleculeString(s),
          steps: state.steps + 1
        });
        openSet.add(s)
      }
    })

  }

  return foundSteps;
}

export function levenshtein(source: string[], target: string[]): number {
  const sizeX = source.length + 1
  const sizeY = target.length + 1

  let cost: number[] = []
  let newCost: number[] = []

  for (let i = 0; i < sizeX; i++) {
    cost[i] = i
  }

  for (let j = 1; j < sizeY; j++) {
    newCost[0] = j
    for (let i = 1; i < sizeX; i++) {
      const match = source[i - 1] === target[j - 1] ? 0 : 1

      const costReplace = cost[i - 1] + match;
      const costInsert = cost[i] + 1;
      const costDelete = newCost[i - 1] + 1;

      newCost[i] = Math.min(costReplace, costInsert, costDelete)
    }
    const swap = cost;
    cost = newCost
    newCost = swap
  }

  return cost[sizeX - 1]
}

export function levenshteinSlow(source: string, target: string): number {
  const grid = new Map();
  const sizeX = source.length + 1
  const sizeY = target.length + 1

  for (let x = 0; x < sizeX; x++) {
    for (let y = 0; y < sizeY; y++) {
      grid.set(xy(x, y), 0)
    }
  }

  for (let x = 0; x < sizeX; x++) {
    grid.set(xy(x, 0), x)
  }

  for (let y = 0; y < sizeY; y++) {
    grid.set(xy(0, y), y)
  }

  for (let x = 1; x < sizeX; x++) {
    for (let y = 1; y < sizeY; y++) {
      if (source[x - 1] === target[y - 1]) {
        const cost = Math.min(
            grid.get(xy(x - 1, y)) + 1,
            grid.get(xy(x - 1, y - 1)),
            grid.get(xy(x, y - 1)) + 1
        )
        grid.set(xy(x, y), cost)
      } else {
        const cost = Math.min(
            grid.get(xy(x - 1, y)) + 1,
            grid.get(xy(x - 1, y - 1)) + 1,
            grid.get(xy(x, y - 1)) + 1
        )
        grid.set(xy(x, y), cost)
      }
    }
  }

  return grid.get(xy(sizeX - 1, sizeY - 1))
}

function xy(x: number, y: number): string {
  return `${x} ${y}`
}

export function findValidNextStates(conversions: Map<string, Array<string>>, state: string[]): string[] {
  let nextStates: string[] = []
  for (let i = 0; i < state.length; i++) {
    const start = state.slice(0, i).join('');
    const sub = state[i];
    const end = state.slice(i + 1).join('')

    const replacements: string[] = conversions.get(sub) ?? []
    replacements.forEach(r => {
      if (!nextStates.includes(start + r + end)) {
        nextStates.push(start + r + end);
      }
    })
  }
  return nextStates;
}

interface StateWithScore {
  score: number,
  state: string[],
  steps: number
}

interface ParseResult {
  conversions: Map<string, Array<string>>;
  molecule: string[];
}

export function parseInput(lines: string[]): ParseResult {
  const conversions = new Map<string, Array<string>>();
  const moleculeStr = lines[lines.length - 1];

  // console.log(moleculeStr);

  const molecule = parseMoleculeString(moleculeStr)

  for (let i = 0; i < lines.length - 1; i++) {
    const tokens = lines[i].split(" => ");

    if (!conversions.get(tokens[0])) {
      conversions.set((tokens[0]), []);
    }
    conversions.get((tokens[0]))?.push((tokens[1]));
  }
  return {conversions: conversions, molecule: molecule};
}

export function parseMoleculeString(moleculeStr: string): string[] {
  return moleculeStr
  .split(/([A-Z][a-z]*)/g)
  .filter((s) => s !== "");
}

if (require.main === module) {
  const lines = loadInput(19).filter((l) => l != "");
  const {conversions, molecule} = parseInput(lines);
  // console.log(molecule);
  // console.log(conversionCount);
  console.log(`Part 1: ${part1(molecule, conversions)}`);

  console.log(`Part 2: ${part2(molecule, conversions)}`)
}
