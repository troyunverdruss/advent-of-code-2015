import fs from "fs";

export function formatDay(day: number): string {
  return day.toString().padStart(2, "0");
}

export function loadInput(day: number): string[] {
  const filename = "inputs/input" + formatDay(day) + ".txt";
  const lines = fs.readFileSync(filename)
    .toString()
    .split(/\r?\n/);
  return lines;
}