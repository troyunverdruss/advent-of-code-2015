import {combinations, part1Slow, slowPermutations, solve} from "../src/day24";

test('permutations 1 2', () => {
  const results = slowPermutations([1, 2])
  expect(results.length).toBe(2)
  expect(results[0]).toStrictEqual([1, 2])
  expect(results[1]).toStrictEqual([2, 1])
})

test('permutations 1 2 3', () => {
  const results = slowPermutations([1, 2, 3])
  expect(results.length).toBe(6)
  expect(results[0]).toStrictEqual([1, 2, 3])
  expect(results[1]).toStrictEqual([1, 3, 2])
  expect(results[2]).toStrictEqual([2, 1, 3])
  expect(results[3]).toStrictEqual([2, 3, 1])
  expect(results[4]).toStrictEqual([3, 1, 2])
  expect(results[5]).toStrictEqual([3, 2, 1])
})

test('combinations 1 2', () => {
  const pick1 = combinations([1,2], 1)
  expect(pick1.length).toBe(2)
  expect(pick1[0]).toStrictEqual([1])
  expect(pick1[1]).toStrictEqual([2])

  const pick2 = combinations([1,2], 2)
  expect(pick2.length).toBe(1)
  expect(pick2[0]).toStrictEqual([1,2])
})

test('combinations 1 2 3', () => {
  const pick1 = combinations([1,2, 3], 1)
  expect(pick1.length).toBe(3)
  expect(pick1[0]).toStrictEqual([1])
  expect(pick1[1]).toStrictEqual([2])
  expect(pick1[2]).toStrictEqual([3])

  const pick2 = combinations([1,2, 3], 2)
  expect(pick2.length).toBe(3)
  expect(pick2[0]).toStrictEqual([1,2])
  expect(pick2[1]).toStrictEqual([1,3])
  expect(pick2[2]).toStrictEqual([2,3])
})

test('example 1 slow', () => {
  const numbers = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11]
  const qe = part1Slow(numbers)
  expect(qe).toBe(99)
})

test('example 1 with new solution', () => {
  const numbers = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11]
  const qe = solve(numbers, true, 3)
  expect(qe).toBe(99)
})
