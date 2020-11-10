import {part1, slowPermutations} from "../src/day24";

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

test('example 1', () => {
  const numbers = [1,2,3,4,5,7,8,9,10,11]
  const qe = part1(numbers)
  expect(qe).toBe(99)
})
