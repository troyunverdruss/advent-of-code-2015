import { loadInput } from "./utils";

const targetDetails = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1
};

class AuntSue {
  number?: number;
  children?: number;
  cats?: number;
  samoyeds?: number;
  pomeranians?: number;
  akitas?: number;
  vizslas?: number;
  goldfish?: number;
  trees?: number;
  cars?: number;
  perfumes?: number;
}

function parseInput(lines: string[]): AuntSue[] {
  const results: AuntSue[] = [];

  // Sue 1: goldfish: 9, cars: 0, samoyeds: 9
  lines.forEach(line => {
    const tokens = line
      .replace(/:/g, "")
      .replace(/,/g, "")
      .split(/\s+/);
    // console.log(tokens);

    tokens.shift();
    const number = tokens.shift() ?? "-1";
    const result = new Map<string, number>();
    result.set("number", Number.parseInt(number));
    for (let i = 0; i < tokens.length; i += 2) {
      // console.log(tokens[i], tokens[i + 1]);
      result.set(tokens[i], Number.parseInt(tokens[i + 1]));
    }

    const sue = new AuntSue();
    sue.number = result.get("number");
    sue.children = result.get("children");
    sue.cats = result.get("cats");
    sue.samoyeds = result.get("samoyeds");
    sue.pomeranians = result.get("pomeranians");
    sue.akitas = result.get("akitas");
    sue.vizslas = result.get("vizslas");
    sue.goldfish = result.get("goldfish");
    sue.trees = result.get("trees");
    sue.cars = result.get("cars");
    sue.perfumes = result.get("perfumes");

    // console.log(sue);
    results.push(sue);
  });

  // console.log(results);
  return results;
}

function part1(sues: AuntSue[]): number {
  let result: number = -1;
  sues.forEach(sue => {
    let possible = true;

    // Must all match below or be disqualified
    if (sue.akitas !== undefined && sue.akitas !== targetDetails.akitas)
      possible = false;
    if (sue.cars !== undefined && sue.cars !== targetDetails.cars)
      possible = false;
    if (sue.cats !== undefined && sue.cats !== targetDetails.cats)
      possible = false;
    if (sue.children !== undefined && sue.children !== targetDetails.children)
      possible = false;
    if (sue.goldfish !== undefined && sue.goldfish !== targetDetails.goldfish)
      possible = false;
    if (sue.perfumes !== undefined && sue.perfumes !== targetDetails.perfumes)
      possible = false;
    if (
      sue.pomeranians !== undefined &&
      sue.pomeranians !== targetDetails.pomeranians
    )
      possible = false;
    if (sue.samoyeds !== undefined && sue.samoyeds !== targetDetails.samoyeds)
      possible = false;
    if (sue.trees !== undefined && sue.trees !== targetDetails.trees)
      possible = false;
    if (sue.vizslas !== undefined && sue.vizslas !== targetDetails.vizslas)
      possible = false;

    if (possible) {
      // console.log(sue);
      result = sue.number ?? -1;
    }
  });
  return result;
}

function part2(sues: AuntSue[]): number {
  let result: number = -1;
  sues.forEach(sue => {
    let possible = true;

    // Greater than this many
    if (sue.cats !== undefined && sue.cats <= targetDetails.cats)
      possible = false;
    if (sue.trees !== undefined && sue.trees <= targetDetails.trees)
      possible = false;

    // Fewer than this many
    if (sue.goldfish !== undefined && sue.goldfish >= targetDetails.goldfish)
      possible = false;
    if (
      sue.pomeranians !== undefined &&
      sue.pomeranians >= targetDetails.pomeranians
    )
      possible = false;

    // Must match exactly
    if (sue.akitas !== undefined && sue.akitas !== targetDetails.akitas)
      possible = false;
    if (sue.cars !== undefined && sue.cars !== targetDetails.cars)
      possible = false;
    if (sue.children !== undefined && sue.children !== targetDetails.children)
      possible = false;
    if (sue.perfumes !== undefined && sue.perfumes !== targetDetails.perfumes)
      possible = false;
    if (sue.samoyeds !== undefined && sue.samoyeds !== targetDetails.samoyeds)
      possible = false;
    if (sue.vizslas !== undefined && sue.vizslas !== targetDetails.vizslas)
      possible = false;

    if (possible) {
      // console.log(sue);
      // console.log(
      //   "x",
      //   sue.cars !== undefined && sue.cars !== targetDetails.cars
      // );
      result = sue.number ?? -1;
    }
  });

  return result;
}

const lines = loadInput(16).filter(l => l != "");
const sues = parseInput(lines);
const sueNumber = part1(sues);
console.log(`Part 1, Sue's number: ${sueNumber}`);

const sueNumber2 = part2(sues);
console.log(`Part 2, Sue's number: ${sueNumber2}`);
