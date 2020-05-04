import { loadInput } from "./utils";

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

  // console.log("combos", combos);
  // let combos = 1;
  // molecule.forEach((atom) => {
  //   console.log("a", combos, atom);
  //   const count = conversionCount.get(atom);

  //   if (count !== undefined) {
  //     combos *= count;
  //   }
  // });

  return combos.size;
}

interface ParseResult {
  conversions: Map<string, Array<string>>;
  molecule: string[];
}

export function parseInput(lines: string[]): ParseResult {
  const conversions = new Map<string, Array<string>>();
  const moleculeStr = lines[lines.length - 1];

  // console.log(moleculeStr);

  const molecule = moleculeStr
    .split(/([A-Z]{1}[a-z]*)/g)
    .filter((s) => s !== "");

  for (let i = 0; i < lines.length - 1; i++) {
    const tokens = lines[i].split(" => ");

    if (!conversions.get(tokens[0])) {
      conversions.set(tokens[0], new Array());
    }
    conversions.get(tokens[0])?.push(tokens[1]);
  }
  return { conversions: conversions, molecule: molecule };
}

if (require.main === module) {
  const lines = loadInput(19).filter((l) => l != "");
  const { conversions, molecule } = parseInput(lines);
  // console.log(molecule);
  // console.log(conversionCount);
  console.log(`Part 1: ${part1(molecule, conversions)}`);
}
