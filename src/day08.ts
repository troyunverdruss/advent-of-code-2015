import { loadInput } from "./utils";

export function part1(lines: string[]): Part1Result {
  let charCount = 0;
  let memCount = 0;

  lines.forEach(line => {
    const chars = line.split("");
    charCount += chars.length;

    let index = 0;
    while (index < chars.length) {
      const r1 = handleEscapedSlash(chars, index);
      if (r1.index > index) {
        memCount += r1.memChars;
        index = r1.index;
        continue;
      }

      const r2 = handleEscapedQuote(chars, index);
      if (r2.index > index) {
        memCount += r2.memChars;
        index = r2.index;
        continue;
      }

      const r3 = handleEscapedHex(chars, index);
      if (r3.index > index) {
        memCount += r3.memChars;
        index = r3.index;
        continue;
      }

      if (chars[index] === '"') {
        index += 1;
        continue;
      }

      index += 1;
      memCount += 1;
    }
  });

  return {
    result: charCount - memCount,
    codeCount: charCount,
    memCount: memCount
  };
}

interface Part1Result {
  result: number;
  codeCount: number;
  memCount: number;
}

export function computeEncodedCount(lines: string[]): number {
  let encCount = 0;
  lines.forEach(line => {
    encCount += 2;
    line.split("").forEach(char => {
      if (['"', "\\"].includes(char)) {
        encCount += 2;
      } else {
        encCount += 1;
      }
    });
  });

  return encCount;
}

interface CharResult {
  memChars: number;
  index: number;
}

export function handleEscapedSlash(chars: string[], index: number): CharResult {
  let memCount = 0;
  let newIndex = index;

  if (
    chars[index] === "\\" &&
    index + 1 <= chars.length &&
    chars[index + 1] == "\\"
  ) {
    memCount += 1;
    newIndex += 2;
  }
  return { memChars: memCount, index: newIndex };
}

export function handleEscapedQuote(chars: string[], index: number): CharResult {
  let memCount = 0;
  let newIndex = index;

  if (
    chars[index] === "\\" &&
    index + 1 <= chars.length &&
    chars[index + 1] == '"'
  ) {
    memCount += 1;
    newIndex += 2;
  }
  return { memChars: memCount, index: newIndex };
}

export function handleEscapedHex(chars: string[], index: number): CharResult {
  let memCount = 0;
  let newIndex = index;

  if (
    chars[index] === "\\" &&
    index + 3 <= chars.length &&
    chars[index + 1] == "x"
  ) {
    memCount += 1;
    newIndex += 4;
  }
  return { memChars: memCount, index: newIndex };
}

const lines = loadInput(8).filter(l => l !== "");
console.log(`Part 1: ${part1(lines).result}`);
console.log(`Part 2: ${computeEncodedCount(lines) - part1(lines).codeCount}`);
