import { loadInput } from "./utils";

export class Jar {
  id: number;
  size: number;

  constructor(id: number, size: number) {
    this.id = id;
    this.size = size;
  }

  public toString(): string {
    return `${this.id}: ${this.size}`;
  }
}

function parseLines(lines: string[]): Jar[] {
  return lines.map((line, index) => new Jar(index, Number.parseInt(line)));
}

export function countValidCombos(
  target: number,
  current: Jar[],
  jars: Jar[]
): Jar[][] {
  // console.log(`targeting ${target}, jars: ${jars}`);
  // Whatever combo we had up til now resulted in a working combo
  if (target === 0) {
    return [current];
  }

  // If we're down to the last jar possible, we can compute if it works or not
  if (jars.length === 1) {
    if (jars[0].size === target) {
      return [current.concat(jars[0])];
    } else {
      return [];
    }
  }

  // Or go through all the remaining combos
  let result: Jar[][] = [];
  for (const jar of jars) {
    const newTarget = target - jar.size;
    if (newTarget < 0) continue;

    const remainingJars = jars.slice(jars.indexOf(jar) + 1);
    // console.log(
    //   `Took ${jar}, next target: ${newTarget}, jars: ${remainingJars}`
    // );
    const solutions = countValidCombos(
      newTarget,
      current.concat(jar),
      remainingJars
    );

    for (const solution of solutions) {
      result.push(solution);
    }
  }

  return result;
}

const lines = loadInput(17).filter(l => l != "");
const jars = parseLines(lines);
// console.log("jars: ", jars);
const part1 = countValidCombos(150, [], jars);
console.log(`Part 1: ${part1.length}`);

// console.log("=======> Part 2");
const minRequired = Math.min(...part1.map(s => s.length));
const solutionsWithMin = part1.filter(s => s.length === minRequired).length;
console.log(`Part 2: ${solutionsWithMin}`);
