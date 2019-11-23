import { loadInput } from "./utils";

export function part1(lines: string[]) {
  let charCount = 0;
  let memCount = 0;
  lines.forEach(line => {
    console.log(line);
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

      const r = handleEscapedHex(chars, index);
      if (r.index > index) {
        memCount += r.memChars;
        index = r.index;
        continue;
      }

      if (chars[index] === '"') {
        index += 1;
        continue;
      }

      console.log(
        `bumping memory count on: ${chars[index]}, index: ${index}, chars: ${chars}`
      );

      index += 1;
      memCount += 1;

      // if (
      //   val === "\\" &&
      //   index + 1 <= chars.length &&
      //   chars[index + 1] == '"'
      // ) {
      //   memCount += 1;
      //   index += 1;
      // } else if (
      //   val === "\\" &&
      //   index + 3 <= chars.length &&
      //   chars[index + 1] == "x"
      // ) {
      //   memCount += 1;
      //   index += 3;
      // }
      // memCount += 1;
      // index += 1;
    }
  });

  console.log(charCount);
  console.log(memCount);

  return [charCount - memCount, charCount, memCount];
}

interface Result {
  memChars: number;
  index: number;
}
export function handleEscapedSlash(chars: string[], index: number): Result {
  var memCount = 0;
  var newIndex = index;
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

export function handleEscapedQuote(chars: string[], index: number): Result {
  var memCount = 0;
  var newIndex = index;
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

export function handleEscapedHex(chars: string[], index: number): Result {
  var memCount = 0;
  var newIndex = index;
  // "\x12"
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

const lines = loadInput(8);
console.log(`Part 1: ${part1(lines)[0]}`);
