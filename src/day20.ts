export function part1(target: number) {

  let value = 0
  let door = 0
  while (value < target) {
    door++;
    value = computeValueAtDoor(door);
  }

  return door;
}

export function part2(target: number) {

  let value = 0
  let door = 0
  while (value < target) {
    door++;
    value = computeValueAtDoorPart2(door);
  }

  return door;
}

export function computeValueAtDoor(door: number): number {
  const factors = findFactors(door)

  let gifts = 0
  for (const value of factors.values()) {
    gifts += value * 10
  }

  // const gifts = Object.values(factors).reduce((sum, factor) => sum + factor)
  return gifts;
}

export function computeValueAtDoorPart2(door: number): number {
  const factors = findFactors(door)

  let gifts = 0
  for (const value of factors.values()) {
    if (value * 50 >= door) {
      gifts += value * 11;
    }
  }

  // const gifts = Object.values(factors).reduce((sum, factor) => sum + factor)
  return gifts;
}

export function computeValueAtDoorSlow(door: number): number {
  let sum = 0;

  if (door === 1) {
    return 10;
  }

  for (let i = 1; i <= Math.floor(door / 2); i++) {
    if (door % i === 0) {
      sum += i * 10
      if (i === 1 && door !== 1) {
        sum += door * 10
      }
    }
  }
  return sum;
}

export function findFactors(number: number): Set<number> {
  const results = new Set<number>();

  if (number === 1) {
    results.add(1);
    return results;
  }

  for (let i = 1; i <= Math.floor(Math.sqrt(number)); i++) {
    if (number % i === 0) {
      results.add(i)
      results.add(number / i)
    }
  }
  return results
}

if (require.main === module) {
  console.log(`Part 1: ${part1(36000000)}`)
  //  831600
  console.log(`Part 2: ${part2(36000000)}`)
  // too high 3272728
}
