import { loadInput } from "./utils";

export enum Kind {
  NAUGHTY,
  NICE
}

export function computeKindPart1(input: string): Kind {
  var last = "";
  var illegalChars = false;
  var vowels = 0;
  var double = false;

  input.split("").forEach(char => {
    if (["ab", "cd", "pq", "xy"].includes(last + char)) illegalChars = true;
    if (["a", "e", "i", "o", "u"].includes(char)) vowels += 1;
    if (char == last) double = true;

    last = char;
  });

  return vowels >= 3 && double && !illegalChars ? Kind.NICE : Kind.NAUGHTY;
}

export function computeKindPart2(input: string): Kind {
  var pairRepeats = false;
  var sandwich = false;

  for (const [index, val] of input.split("").entries()) {
    if (index > 0) {
      const pair = input[index - 1] + val;
      if (input.split(pair).length > 2) pairRepeats = true;
    }
    if (index > 1) {
      if (input[index - 2] == val) sandwich = true;
    }
  }

  return pairRepeats && sandwich ? Kind.NICE : Kind.NAUGHTY;
}

const lines = loadInput(5);

const part1NiceCount = lines
  .map(l => computeKindPart1(l))
  .filter(k => k === Kind.NICE).length;
console.log(`Part 1: ${part1NiceCount}`);

const part2NiceCount = lines.map(computeKindPart2).filter(k => k == Kind.NICE)
  .length;
console.log(`Part 2: ${part2NiceCount}`);
