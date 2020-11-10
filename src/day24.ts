import {loadInput} from "./utils";
import {permutations} from "itertools";

const memo: Map<number[], number[][]> = new Map()

export function slowPermutations(items: number[]): number[][] {
  const result: number[][] = []

  const cache = memo.get(items)
  if (cache !== undefined) {
    return cache
  }

  if (items.length === 0) {
    throw Error('Should never be 0 items here');
  }

  if (items.length === 1) {
    result.push([items[0]]);
    memo.set(items, result)
    return result;
  }

  for (let i = 0; i < items.length; i++) {
    const copy = [...items]
    const start = copy.splice(i, 1)
    const endings = permutations(copy)
    for (const end of endings) {
      result.push(start.concat(end))
    }
  }

  memo.set(items, result)
  return result
}

interface Combo {
  qe: number
  group1Count: number
  group1: string
  group2: string
  group3: string
}

export function part1(numbers: number[]): number {
  const perms = permutations(numbers.sort().reverse())
  const totalWeight = numbers.reduce((sum, v) => sum + v)
  const targetWeight = totalWeight / 3

  const solutions: Combo[] = []
  const seen: Set<string> = new Set()
  let smallestGroup1 = 1000000
  for (const perm of perms) {
    for (let i = 1; i < perm.length; i++) {
      const group1 = perm.slice(0, i)
      const sum1 = group1.reduce((s, v) => s + v)
      if (group1.length > smallestGroup1) {
        break;
      }
      if (sum1 > targetWeight) {
        break;
      }
      if (sum1 !== targetWeight) {
        continue;
      }
      for (let j = i + 1; j < perm.length; j++) {
        const group2 = perm.slice(i, j)
        const sum2 = group2.reduce((s, v) => s + v)
        if (sum2 > targetWeight) {
          break
        }
        if (sum2 !== targetWeight) {
          continue;
        }
        const group3 = perm.slice(j)
        const sum3 = group3.reduce((s, v) => s + v)
        if (sum3 !== targetWeight) {
          throw Error('Something bad')
        }
        let solution = {
          qe: group1.reduce((p, v) => p * v),
          group1Count: group1.length,
          group1: group1.sort().join(),
          group2: group2.sort().join(),
          group3: group3.sort().join()
        };
        const key = [solution.group1, solution.group2, solution.group3].join('|')
        if (!seen.has(key)) {
          smallestGroup1 = Math.min(smallestGroup1, group1.length)
          solutions.push(solution)
          seen.add(key)
        }
      }
    }
  }

  const qes = solutions
  .filter(s => s.group1Count === smallestGroup1)
  .map(s => s.qe)

  return Math.min(...qes)
}

if (require.main === module) {
  const numbers = loadInput(24).filter((l) => l != "").map(l => parseInt(l));
  const qe = part1(numbers)
  console.log(`Part 1, quantum entanglement: ${qe}`)
}
