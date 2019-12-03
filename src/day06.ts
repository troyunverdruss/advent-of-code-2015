import { loadInput } from "./utils";

const enum Command {
  ON,
  OFF,
  TOGGLE
}

class Instruction {
  cmd: Command;
  start: number[];
  end: number[];

  constructor(cmdStr: string, startStr: string, endStr: string) {
    this.cmd = commandFromString(cmdStr);
    this.start = startStr.split(",").map(Number);
    this.end = endStr.split(",").map(Number);
  }
}

class Light {
  brightness: number = 0;

  public change(cmd: Command) {
    if (cmd === Command.ON) {
      this.brightness += 1;
    } else if (cmd === Command.OFF) {
      if (this.brightness > 0) this.brightness -= 1;
    } else if (cmd === Command.TOGGLE) {
      this.brightness += 2;
    } else throw new TypeError(`Unknown type: ${cmd}`);
  }
}

function commandFromString(str: string): Command {
  if (str === "on") return Command.ON;
  if (str === "off") return Command.OFF;
  if (str === "toggle") return Command.TOGGLE;
  throw new TypeError(`Unknown type: ${str}`);
}

function parseLine(line: string): Instruction {
  const tokens = line.split(" ");

  if (tokens[0] === "toggle") {
    return new Instruction(tokens[0], tokens[1], tokens[3]);
  } else {
    return new Instruction(tokens[1], tokens[2], tokens[4]);
  }
}

const part1Grid = new Map();
for (let x = 0; x < 1000; x++) {
  for (let y = 0; y < 1000; y++) {
    part1Grid.set([x, y].toString(), false);
  }
}

const instructions = loadInput(6)
  .filter(l => l != "")
  .map(parseLine);

instructions.forEach(inst => {
  for (let x = inst.start[0]; x <= inst.end[0]; x++) {
    for (let y = inst.start[1]; y <= inst.end[1]; y++) {
      if (inst.cmd === Command.ON) {
        part1Grid.set([x, y].toString(), true);
      } else if (inst.cmd === Command.OFF) {
        part1Grid.set([x, y].toString(), false);
      } else if (inst.cmd === Command.TOGGLE) {
        part1Grid.set([x, y].toString(), !part1Grid.get([x, y].toString()));
      } else {
        throw new TypeError(`Unknown type: ${inst.cmd}`);
      }
    }
  }
});

if (require.main === module) {
  const countOn = [...part1Grid.values()].filter(v => v === true).length;
  console.log(`Part 1: ${countOn}`);

  // Part 2
  const part2Grid = new Map();
  for (let x = 0; x < 1000; x++) {
    for (let y = 0; y < 1000; y++) {
      part2Grid.set([x, y].toString(), new Light());
    }
  }

  instructions.forEach(inst => {
    for (let x = inst.start[0]; x <= inst.end[0]; x++) {
      for (let y = inst.start[1]; y <= inst.end[1]; y++) {
        part2Grid.get([x, y].toString()).change(inst.cmd);
      }
    }
  });

  const brightness = [...part2Grid.values()]
    .map(l => l.brightness)
    .reduce((total, num) => total + num);
  console.log(`Part 2: ${brightness}`);
}
