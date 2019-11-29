import { loadInput } from "./utils";

export class Reindeer {
  name: string;
  speed: number;
  goTime: number;
  restTime: number;

  constructor(name: string, speed: number, goTime: number, restTime: number) {
    this.name = name;
    this.speed = speed;
    this.goTime = goTime;
    this.restTime = restTime;
  }
}

function parseInput(lines: string[]): Reindeer[] {
  const result: Reindeer[] = [];

  lines.forEach(line => {
    const tokens = line.split(/\s+/);
    const name = tokens[0];
    const speed = Number.parseInt(tokens[3]);
    const goTime = Number.parseInt(tokens[6]);
    const restTime = Number.parseInt(tokens[13]);

    result.push(new Reindeer(name, speed, goTime, restTime));
  });

  return result;
}

export class Result {
  name: string;
  distance: number;

  constructor(name: string, distance: number) {
    this.name = name;
    this.distance = distance;
  }
}

export function computeResultAtTime(
  reindeer: Reindeer[],
  time: number
): Result[] {
  const results: Result[] = [];
  reindeer.forEach(r => {
    const times = Math.floor(time / (r.goTime + r.restTime));
    const remainder = time % (r.goTime + r.restTime);

    const distance =
      times * r.speed * r.goTime +
      (remainder >= r.goTime ? r.goTime * r.speed : remainder * r.speed);

    results.push(new Result(r.name, distance));
  });

  return results;
}

function part1(reindeer: Reindeer[], time: number): number {
  const results = computeResultAtTime(reindeer, time);
  return Math.max(...results.map(r => r.distance));
}

export function part2(reindeer: Reindeer[], time: number): number {
  const scores = new Map();

  for (let t = 1; t <= time; t++) {
    const results = computeResultAtTime(reindeer, t);
    const farthest = Math.max(...results.map(r => r.distance));
    results
      .filter(r => r.distance == farthest)
      .forEach(r => scores.set(r.name, (scores.get(r.name) ?? 0) + 1));
  }

  return Math.max(...scores.values());
}

const lines = loadInput(14).filter(l => l != "");
const input = parseInput(lines);

console.log(`Part 1: ${part1(input, 2503)}`);
console.log(`Part 2: ${part2(input, 2503)}`);
