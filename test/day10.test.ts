import { runIterations } from "../src/day10";

test("1", () => {
  const result = runIterations("1", 1);
  expect(result).toBe("11");
});

test("1 for 5", () => {
  const result = runIterations("1", 5);
  expect(result).toBe("312211");
});

test("11", () => {
  const result = runIterations("11", 1);
  expect(result).toBe("21");
});

test("21", () => {
  const result = runIterations("21", 1);
  expect(result).toBe("1211");
});

test("1211", () => {
  const result = runIterations("1211", 1);
  expect(result).toBe("111221");
});

test("111221", () => {
  const result = runIterations("111221", 1);
  expect(result).toBe("312211");
});
