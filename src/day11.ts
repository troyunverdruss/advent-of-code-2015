interface NextAlphabet {
  letter: string;
  rolled: boolean;
}

function computeLookup(): string[] {
  const lookup = [];
  for (let i = 0; i < Alphabet.letters.length - 2; i++) {
    lookup.push(Alphabet.letters.slice(i, i + 3).join(""));
  }
  return lookup;
}

class Alphabet {
  static letters = "abcdefghijklmnopqrstuvwxyz".split("");
  static validLetters = "abcdefghjkmnpqrstuvwxyz".split("");
  static straightLookup = computeLookup();

  static next(cur: string): NextAlphabet {
    if (cur === "z") {
      return { letter: "a", rolled: true };
    }
    const index = this.validLetters.indexOf(cur);
    return { letter: Alphabet.validLetters[index + 1], rolled: false };
  }
}

export function computeNextEntry(current: string[]): string[] {
  const result = [];
  let shouldInc = true;
  for (let i = current.length - 1; i >= 0; i--) {
    if (shouldInc) {
      const r = Alphabet.next(current[i]);
      shouldInc = r.rolled;
      result.unshift(r.letter);
    } else {
      result.unshift(current[i]);
    }
  }
  if (shouldInc) {
    result.unshift("a");
  }
  return result;
}

export function hasIncreasingStraight(current: string[]): boolean {
  const test = current.join("");
  for (let l of Alphabet.straightLookup) {
    if (test.indexOf(l) >= 0) {
      return true;
    }
  }
  return false;
}

export function doesNotHaveIllegalLetters(current: string[]): boolean {
  if (current.includes("i") || current.includes("o") || current.includes("l")) {
    return false;
  }
  return true;
}

export function hasTwoPairs(current: string[]): boolean {
  let pair1: string | undefined;

  for (let i = 0; i < current.length - 1; i++) {
    if (pair1 === undefined && current[i] === current[i + 1]) {
      pair1 = current[i];
    } else if (current[i] !== pair1 && current[i] === current[i + 1]) {
      return true;
    }
  }
  return false;
}

export function computeNextPassword(input: string): string {
  let current = input.split("");
  let searching = true;
  while (searching) {
    current = computeNextEntry(current);

    if (
      hasIncreasingStraight(current) &&
      // Shouldn't have to test this, since validLetters doesn't include them
      // doesNotHaveIllegalLetters(current) &&
      hasTwoPairs(current)
    ) {
      searching = false;
    }
  }

  return current.join("");
}

const input = "cqjxjnds";
const part1 = computeNextPassword(input);
console.log(`Part 1: ${part1}`);

const part2 = computeNextPassword(part1);
console.log(`Part 2: ${part2}`);
