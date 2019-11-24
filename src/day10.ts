function splitIntoGroups(numbers: number[]): number[][] {
  const result = [];
  let current: number[] = [];

  for (let i = 0; i <= numbers.length; i++) {
    if (i == numbers.length) {
      result.push(current);
    } else if (i === 0) {
      current.push(numbers[i]);
    } else if (numbers[i] === current[0]) {
      current.push(numbers[i]);
    } else {
      result.push(current);
      current = [numbers[i]];
    }
  }

  return result;
}

function processGroups(groups: number[][]): number[] {
  const result: number[] = [];

  groups.forEach(group => {
    result.push(group.length);
    result.push(group[0]);
  });

  return result;
}

export function runIterations(input: string, rounds: number): string {
  let numbers = input.split("").map(n => Number.parseInt(n));
  for (let i = 0; i < rounds; i++) {
    const groups = splitIntoGroups(numbers);
    numbers = processGroups(groups);
  }
  return numbers.join("");
}

const input = "1113222113";
const part1 = runIterations(input, 40);
console.log(`Part 1: ${part1.length}`);

const part2 = runIterations(input, 50);
console.log(`Part 1: ${part2.length}`);
