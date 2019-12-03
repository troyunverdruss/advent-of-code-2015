import { loadInput } from "./utils";
import * as itertools from "itertools";

export function parseInput(lines: string[]): Map<string, Map<string, number>> {
  const result = new Map<string, Map<string, number>>();
  lines.forEach(line => {
    const tokens = line.replace(".", "").split(/\s+/);
    const subject = tokens[0];
    const object = tokens[10];
    const value =
      tokens[2] == "gain"
        ? Number.parseInt(tokens[3])
        : -Number.parseInt(tokens[3]);

    if (!result.has(subject)) {
      result.set(subject, new Map());
    }

    if (!result.has(object)) {
      result.set(object, new Map());
    }

    result.get(subject)?.set(object, value);
  });

  return result;
}

export function computeArrangementValue(
  input: Map<string, Map<string, number>>,
  order: string[]
): number {
  const lastIndex = order.length - 1;

  let happiness = 0;

  for (let i = 0; i < order.length; i++) {
    const subject = order[i];
    const left = i == 0 ? order[lastIndex] : order[i - 1];
    const right = i == lastIndex ? order[0] : order[i + 1];

    const leftValue = input.get(subject)?.get(left) ?? 0;
    const rightValue = input.get(subject)?.get(right) ?? 0;

    happiness += leftValue + rightValue;
  }

  return happiness;
}

export function solve(input: Map<string, Map<string, number>>): number {
  let maxHappiness = 0;
  for (const order of itertools.permutations(input.keys())) {
    const value = computeArrangementValue(input, order);

    if (value > maxHappiness) {
      maxHappiness = value;
    }
  }
  return maxHappiness;
}

function addMe(
  input: Map<string, Map<string, number>>
): Map<string, Map<string, number>> {
  const objects: string[] = [];

  for (const key of input.keys()) {
    objects.push(key);
    input.get(key)?.set("me", 0);
  }

  input.set("me", new Map());
  objects.forEach(o => {
    input.get("me")?.set(o, 0);
  });

  return input;
}

if (require.main === module) {
  const lines = loadInput(13).filter(l => l != "");
  const input = parseInput(lines);

  console.log(`Part 1: ${solve(input)}`);

  const inputWithMe = addMe(parseInput(lines));

  console.log(`Part 2: ${solve(inputWithMe)}`);
}
