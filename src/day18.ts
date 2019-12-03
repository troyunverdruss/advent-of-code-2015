import { loadInput } from "./utils";

export function parseInput(lines: string[]): Map<string, boolean> {
  const result = new Map<string, boolean>();
  let y = 0;
  lines.forEach(line => {
    let x = 0;
    line.split("").forEach(char => {
      if (char === "#") {
        result.set(key(x, y), true);
      } else if (char === ".") {
        result.set(key(x, y), false);
      }
      x++;
    });
    y++;
  });

  return result;
}

export function animate(
  grid: Map<string, boolean>,
  steps: number,
  cornersStuckOn: boolean
) {
  const nextStates: string[][] = [];
  [...Array(steps).keys()].forEach(s => {
    // console.log("step: ", s);

    for (let y = 0; y < Math.sqrt(grid.size); y++) {
      for (let x = 0; x < Math.sqrt(grid.size); x++) {
        // console.log(key(x, y), ": ", grid.get(key(x, y)));
        // process.stdout.write(grid.get(key(x, y)) + "");
        let countOn = 0;
        getNeighbors(x, y).forEach(n => {
          const s = grid.get(n);
          if (s) countOn++;
        });

        const state = grid.get(key(x, y));
        if (state !== undefined) {
          // If we're currently on
          if (state && [2, 3].includes(countOn)) {
            nextStates.push([key(x, y), "true"]);
          } else if (state) {
            nextStates.push([key(x, y), "false"]);
          } else if (countOn === 3) {
            nextStates.push([key(x, y), "true"]);
          } else {
            nextStates.push([key(x, y), "false"]);
          }
        }
        // console.log("added state: ", nextStates[nextStates.length - 1]);
      }
      // console.log("");
    }
    // console.log("next states", nextStates);
    nextStates.forEach(s => {
      // console.log(s, ": ", s[0], " => ", !!s[1]);
      grid.set(s[0], s[1] === "true");
    });
    if (cornersStuckOn) {
      enableCorners(grid);
    }
    // console.log(grid);
    countLightsThatAreOn(grid);
  });
}

export function enableCorners(grid: Map<string, boolean>) {
  const min = 0;
  const max = Math.sqrt(grid.size) - 1;
  grid.set(key(min, min), true);
  grid.set(key(min, max), true);
  grid.set(key(max, min), true);
  grid.set(key(max, max), true);
}

function getNeighbors(x: number, y: number): string[] {
  const results: string[] = [];
  const dirs = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1]
  ];

  dirs.forEach(d => {
    results.push(key(x + d[0], y + d[1]));
  });
  return results;
}

function key(x: number, y: number): string {
  return `${x} ${y}`;
}

export function countLightsThatAreOn(grid: Map<string, boolean>): number {
  const on = [...grid.values()].filter(l => l).length;
  // console.log("on", on);
  return on;
}

if (require.main === module) {
  const lines = loadInput(18).filter(l => l != "");
  const lights = parseInput(lines);
  animate(lights, 100, false);
  const part1 = countLightsThatAreOn(lights);
  console.log(`Part 1: ${part1}`);

  const lights2 = parseInput(lines);
  enableCorners(lights2);
  animate(lights2, 100, true);
  const part2 = countLightsThatAreOn(lights2);
  console.log(`Part 2: ${part2}`);
}
