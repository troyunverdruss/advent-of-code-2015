import {findSequenceNumber, parseInput, part1} from "../src/day25";
import {loadInput} from "../src/utils";

test('test sequence numbers', () => {
  expect(findSequenceNumber(1,1)).toBe(1)
  expect(findSequenceNumber(1,2)).toBe(3)
  expect(findSequenceNumber(1,3)).toBe(6)
  expect(findSequenceNumber(1,4)).toBe(10)
  expect(findSequenceNumber(1,5)).toBe(15)
  expect(findSequenceNumber(1,6)).toBe(21)

  expect(findSequenceNumber(2,4)).toBe(14)
  expect(findSequenceNumber(3,3)).toBe(13)
  expect(findSequenceNumber(4,1)).toBe(7)
  expect(findSequenceNumber(5,2)).toBe(17)
  expect(findSequenceNumber(6,1)).toBe(16)


})

test('check some examples', () => {
  expect(part1(1, 1)).toBe(20151125)
  expect(part1(2, 2)).toBe(21629792)
  expect(part1(2, 4)).toBe(7726640)
  expect(part1(5, 4)).toBe(6899651)
})
