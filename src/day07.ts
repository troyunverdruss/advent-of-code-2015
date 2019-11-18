import { loadInput } from "./utils";

class Wire {
  static numberRegex = /^\d+$/;

  value?: number = undefined;
  desc: string;

  constructor(desc: string) {
    this.desc = desc;
    if (Wire.numberRegex.test(desc)) {
      this.value = Number(desc);
    }
  }
}

function resolve(wires: Map<string, Wire>, id: string): number {
  if (Wire.numberRegex.test(id)) {
    return Number(id);
  }

  const wire = wires.get(id);

  if (wire === undefined) {
    console.log(wire);
    throw new ReferenceError("Wire not defined");
  }

  if (wire.value) {
    return wire.value;
  }
  const tokens = wire.desc.split(" ");
  if (tokens[0] === "NOT") {
    wire.value = ~resolve(wires, tokens[1]);
    return wire.value;
  } else if (tokens.length == 1) {
    wire.value = resolve(wires, tokens[0]);
    return wire.value;
  } else if (tokens[1] === "AND") {
    wire.value = resolve(wires, tokens[0]) & resolve(wires, tokens[2]);
    return wire.value;
  } else if (tokens[1] === "OR") {
    wire.value = resolve(wires, tokens[0]) | resolve(wires, tokens[2]);
    return wire.value;
  } else if (tokens[1] === "LSHIFT") {
    wire.value = resolve(wires, tokens[0]) << resolve(wires, tokens[2]);
    return wire.value;
  } else if (tokens[1] === "RSHIFT") {
    wire.value = resolve(wires, tokens[0]) >> resolve(wires, tokens[2]);
    return wire.value;
  }
  throw new TypeError(`Unknown expression: ${wire.desc}`);
}

const wires = new Map<string, Wire>();
loadInput(7)
  .filter(l => l != "")
  .forEach(l => {
    const [desc, id] = l.split(" -> ");
    wires.set(id, new Wire(desc));
  });

const aValue = resolve(wires, "a");
console.log(`Part 1: ${aValue}`);
