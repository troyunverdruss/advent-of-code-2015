import md5 from "md5";

export function findFirst(seed: string, zeroCount: number): number {
  let n = 0;

  while (true) {
    n += 1;
    const hash = md5(seed + n);
    if (hash.substr(0, zeroCount) == "0".repeat(zeroCount)) {
      return n;
    }
  }
}

if (require.main === module) {
  const input = "yzbqklnj";
  console.log(`Part 1: ${findFirst(input, 5)}`);
  console.log(`Part 2: ${findFirst(input, 6)}`);
}
