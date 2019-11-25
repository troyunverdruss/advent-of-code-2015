import { loadInput } from "./utils";

function findNumbers(results: number[], arg: any, ignoreRed: boolean) {
  if (typeof arg === "number") {
    results.push(arg);
  } else if (arg instanceof Array) {
    arg.map(v => findNumbers(results, v, ignoreRed));
  } else if (arg instanceof Object) {
    if (ignoreRed) {
      const maybeRed = Object.values(arg).filter(v => v === "red");

      if (maybeRed.length === 0) {
        Object.keys(arg).map(k => findNumbers(results, arg[k], ignoreRed));
      }
    } else {
      Object.keys(arg).map(k => findNumbers(results, arg[k], ignoreRed));
    }
  }
}

const rawData = loadInput(12)[0];
const js = JSON.parse(rawData);

const part1Results: number[] = [];
findNumbers(part1Results, js, false);
const sum1 = part1Results.reduce((a, b) => a + b);
console.log(`Part 1: ${sum1}`);

const part2Results: number[] = [];
findNumbers(part2Results, js, true);
const sum2 = part2Results.reduce((a, b) => a + b);
console.log(`Part 2: ${sum2}`);
