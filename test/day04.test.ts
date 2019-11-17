import { findFirst } from "../src/day04";

test("example 1", () => {
  expect(findFirst("abcdef", 5)).toBe(609043);
});

test("example 2", () => {
  expect(findFirst("pqrstuv", 5)).toBe(1048970);
});
