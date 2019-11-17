import { loadInput } from "./utils";

export function compute(lines: string[]): number[] {
  let totalPaper = 0;
  let totalRibbon = 0;

  lines.forEach(dim => {
    const [l, w, h] = dim.split("x").map(s => Number.parseInt(s));

    const volume = l * w * h;
    const sides = [l * w, l * h, w * h];
    const perims = [2 * l + 2 * w, 2 * l + 2 * h, 2 * w + 2 * h];

    const area = sides.map(x => 2 * x).reduce((total, num) => total + num);

    const required = area + Math.min(...sides);
    totalPaper += required;

    totalRibbon += Math.min(...perims) + volume;
  });

  return [totalPaper, totalRibbon];
}

const lines = loadInput(2).filter(l => l != "");
const [paper, ribbon] = compute(lines);

console.log(`Part 1: ${paper}`);
console.log(`Part 2: ${ribbon}`);
