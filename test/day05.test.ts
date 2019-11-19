import { computeKindPart1, Kind, computeKindPart2 } from "../src/day05";

test("part 1, example 1", () => {
  expect(computeKindPart1("ugknbfddgicrmopn")).toBe(Kind.NICE);
});

test("part 1, example 2", () => {
  expect(computeKindPart1("aaa")).toBe(Kind.NICE);
});

test("part 1, example 3", () => {
  expect(computeKindPart1("jchzalrnumimnmhp")).toBe(Kind.NAUGHTY);
});

test("part 1, example 4", () => {
  expect(computeKindPart1("haegwjzuvuyypxyu")).toBe(Kind.NAUGHTY);
});

test("part 1, example 5", () => {
  expect(computeKindPart1("dvszwmarrgswjxmb")).toBe(Kind.NAUGHTY);
});

test("part 2, example 1", () => {
  expect(computeKindPart2("qjhvhtzxzqqjkmpb")).toBe(Kind.NICE);
});

test("part 2, example 2", () => {
  expect(computeKindPart2("xxyxx")).toBe(Kind.NICE);
});

test("part 2, example 3", () => {
  expect(computeKindPart2("uurcxstgmygtbstg")).toBe(Kind.NAUGHTY);
});
test("part 2, example 4", () => {
  expect(computeKindPart2("ieodomkazucvgmuy")).toBe(Kind.NAUGHTY);
});
