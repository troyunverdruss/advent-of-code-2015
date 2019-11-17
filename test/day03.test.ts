import { Point, performVisits } from "../src/day03";

test("points equal", () => {
  const a = new Point(1, 2);
  const b = new Point(1, 2);

  expect(a).toEqual(b);
});

test("example 1", () => {
  const data = ">";
  const count = performVisits(data, new Set()).size;
  expect(count).toBe(2);
});

test("example 2", () => {
  const data = "^>v<";
  const count = performVisits(data, new Set()).size;
  expect(count).toBe(4);
});

test("example 3", () => {
  const data = "^v^v^v^v^v";
  const count = performVisits(data, new Set()).size;
  expect(count).toBe(2);
});

test("sets work?", () => {
  const s = new Set();
  s.add(1);
  s.add(1);
  s.add(2);
  expect(s.size).toBe(2);
});

test("sets work with points?", () => {
  const s = new Set();
  s.add(new Point(1, 2).toString());
  s.add(new Point(1, 2).toString());
  s.add(new Point(2, 2).toString());
  expect(s.size).toBe(2);
});

test("sets work with tuples?", () => {
  const s = new Set();
  s.add([1, 2].toString());
  s.add([1, 2].toString());
  s.add([2, 2].toString());
  expect(s.size).toBe(2);
});
