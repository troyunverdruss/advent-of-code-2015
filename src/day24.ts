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
    const endings = slowPermutations(copy)
    for (const end of endings) {
      result.push(start.concat(end))
    }
  }

  memo.set(items, result)
  return result
}

export function combinations(items: number[], pick: number): number[][] {
  // pick 1 means each digit is a solution
  if (pick === 1) {
    return items.map(digit => [digit]);
  }

  const result: number[][] = []

  // if we're down to only 1 item
  if (items.length === 1) {
    result.push([items[0]]);
    return result;
  }

  items.forEach((item, index) => {
    const subCombo = combinations(items.slice(index + 1), pick - 1)
    subCombo.forEach(combo => {
      result.push([item].concat(combo))
    })
  })

  return result
}

interface Combo {
  qe: number
  group1Count: number
  group1: string
  group2: string
  group3: string
}

export function solve(_numbers: number[], first: boolean, groups: number): number | null {
  const numbers: Set<number> = new Set(_numbers)
  const totalWeight = _numbers.reduce((sum, v) => sum + v)
  const targetWeight = totalWeight / groups

  if (groups === 1 && totalWeight === targetWeight) {
    return _numbers.reduce((p,v) => p*v)
  } else if (groups === 1) {
    return null
  }

  for (let i = 2; i < numbers.size; i++) {

    const combos:number[][]= []
    for (const combo of combinations([...numbers], i)) {
      combos.push([...combo])
    }

    const filteredCombos = combos.filter(c => c.reduce((s, v) => s + v) === targetWeight);
    if (filteredCombos.length === 0) {
      continue
    }

    for (const filteredCombo of filteredCombos) {
      const remaining = setDiff(numbers, new Set(filteredCombo))
      const result = solve([...remaining], false, groups - 1)
      if (result !== null) {
        return filteredCombo.reduce((p, v) => p * v);
      }
    }
  }
  return null
}

function setDiff(a: Set<number>, b: Set<number>) {
  return new Set([...a].filter(x => !b.has(x)));
}

export function part1Slow(numbers: number[]): number {
  const perms = permutations(numbers.sort().reverse())
  console.log(`perms done`)
  const totalWeight = numbers.reduce((sum, v) => sum + v)
  const targetWeight = totalWeight / 3

  const solutions: Combo[] = []
  const seen: Set<string> = new Set()
  const group1Seen: Set<string> = new Set()
  const group2Seen: Set<string> = new Set()

  let smallestGroup1 = 1000000
  for (const perm of perms) {
    for (let i = 1; i < perm.length - 4; i++) {
      const group1 = perm.slice(0, i)
      const sum1 = group1.reduce((s, v) => s + v)

      const group1Key = group1.sort().join()
      if (group1Seen.has(group1Key)) {
        break
      }
      group1Seen.add(group1Key)
      if (group1.length > smallestGroup1) {
        break;
      }
      if (sum1 > targetWeight) {
        break;
      }
      if (sum1 !== targetWeight) {
        continue;
      }
      for (let j = i + 1; j < perm.length - 2; j++) {
        const group2 = perm.slice(i, j)
        const sum2 = group2.reduce((s, v) => s + v)

        const group2Key = [group1Key, group2.sort().join()].join('|')
        if (group2Seen.has(group2Key)) {
          break
        }
        group2Seen.add(group2Key)

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

  console.log(`solutions: ${solutions.length}`)
  const qes = solutions
  .filter(s => s.group1Count === smallestGroup1)
  .map(s => s.qe)

  return Math.min(...qes)
}

if (require.main === module) {
  const numbers = loadInput(24).filter((l) => l != "").map(l => parseInt(l));
  console.log(`Part 1, quantum entanglement: ${solve(numbers, true,3)}`)
  console.log(`Part 2, quantum entanglement: ${solve(numbers, true,4)}`)
}
