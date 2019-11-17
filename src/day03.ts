import { loadInput } from "./utils";

const data = loadInput(3)[0];

export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public toString() {
    return `${this.x} ${this.y}`;
  }
}

export function performVisits(
  data: string,
  initialSeen: Set<string>
): Set<string> {
  const seen = new Set(initialSeen);
  var loc = new Point(0, 0);
  seen.add(loc.toString());

  data.split("").forEach(char => {
    // console.log(loc);
    // console.log(char);
    if (char == "^") {
      loc = new Point(loc.x, loc.y + 1);
    } else if (char == ">") {
      loc = new Point(loc.x + 1, loc.y);
    } else if (char == "v") {
      loc = new Point(loc.x, loc.y - 1);
    } else if (char == "<") {
      loc = new Point(loc.x - 1, loc.y);
    }

    if (char != "") {
      seen.add(loc.toString());
    }
  });
  return seen;
}

export function splitInput(data: string): string[] {
  const santa = [];
  const roboSanta = [];

  for (const [index, val] of data.split("").entries()) {
    if (index % 2 == 0) {
      santa.push(val);
    } else {
      roboSanta.push(val);
    }
  }
  return [santa.join(""), roboSanta.join("")];
}

const count = performVisits(data, new Set()).size;
console.log(`Part 1: ${count}`);

const [santaPath, roboSantaPath] = splitInput(data);
const santaSeen = performVisits(santaPath, new Set());
const allSeen = performVisits(roboSantaPath, santaSeen);
console.log(`Part 2: ${allSeen.size}`);
