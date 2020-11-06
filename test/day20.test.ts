import {computeValueAtDoor, computeValueAtDoorPart2, findFactors, part1} from "../src/day20";

test('test examples for part 1 - 1', () => {
  const v1 = computeValueAtDoor(1)
  expect(v1).toBe(10)
})
test('test examples for part 1 - 2', () => {
  const v2 = computeValueAtDoor(2)
  expect(v2).toBe(30)
})
test('test examples for part 1 - 3', () => {
  const v3 = computeValueAtDoor(3)
  expect(v3).toBe(40)
})
test('test examples for part 1 - 4', () => {
  const v4 = computeValueAtDoor(4)
  expect(v4).toBe(70)
})
test('test examples for part 1 - 5', () => {
  const v5 = computeValueAtDoor(5)
  expect(v5).toBe(60)
})
test('test examples for part 1 - 6', () => {
  const v6 = computeValueAtDoor(6)
  expect(v6).toBe(120)
})

test('test examples for part 1 - 7', () => {
  const v7 = computeValueAtDoor(7)
  expect(v7).toBe(80)
})

test('test examples for part 1 - 8', () => {
  const v8 = computeValueAtDoor(8)
  expect(v8).toBe(150)
})
test('test examples for part 1 -9', () => {
  const v9 = computeValueAtDoor(9)
  expect(v9).toBe(130)

})

// test('test logic for part 1', () => {
//   const door = part1(10000000)
//   expect(door).toBe(6)
// })

test('test find factors', () => {
  const res = computeValueAtDoorPart2(10)
  console.log(res)
})
