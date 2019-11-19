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

class Operators {
  static lookup = new Map([
    ["NOT", (a: number) => ~a],
    ["AND", (a: number, b: number) => a & b],
    ["OR", (a: number, b: number) => a | b],
    ["LSHIFT", (a: number, b: number) => a << b],
    ["RSHIFT", (a: number, b: number) => a >> b]
  ]);

  static do(oper: string, a: number, b: number) {
    const f = Operators.lookup.get(oper);
    if (f) {
      return f(a, b);
    }

    throw new TypeError(`Undefined operator: ${oper}`);
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
  if (tokens.length == 1) {
    wire.value = resolve(wires, tokens[0]);
    return wire.value;
  } else if (tokens[0] === "NOT") {
    const a = resolve(wires, tokens[1]);
    wire.value = Operators.do(tokens[0], a, 0);
    return wire.value;
  } else if (["AND", "OR", "LSHIFT", "RSHIFT"].includes(tokens[1])) {
    const a = resolve(wires, tokens[0]);
    const b = resolve(wires, tokens[2]);
    wire.value = Operators.do(tokens[1], a, b);
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

const part1AValue = resolve(wires, "a");
console.log(`Part 1: ${part1AValue}`);

[...wires.values()].map(w => (w.value = undefined));
const b = wires.get("b");
if (b) {
  b.value = part1AValue;
}

const part2AValue = resolve(wires, "a");
console.log(`Part 2: ${part2AValue}`);
