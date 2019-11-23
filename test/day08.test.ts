import {
  part1,
  computeEncodedCount,
  handleEscapedSlash,
  handleEscapedHex,
  handleEscapedQuote
} from "../src/day08";
import fs from "fs";

test("example double quotes", () => {
  const lines = fs
    .readFileSync("test_inputs/day08/double-quotes")
    .toString()
    .split(/\r?\n/);

  const res = part1(lines);
  expect(res.codeCount).toBe(2);
  expect(res.memCount).toBe(0);
  expect(res.result).toBe(2);
});

test("normal strings", () => {
  const lines = fs
    .readFileSync("test_inputs/day08/simple-strings")
    .toString()
    .split(/\r?\n/);

  const res = part1(lines);
  expect(res.codeCount).toBe(8);
  expect(res.memCount).toBe(4);
  expect(res.result).toBe(4);
});

test("with escaped slashes", () => {
  const lines = fs
    .readFileSync("test_inputs/day08/escaped-slashes")
    .toString()
    .split(/\r?\n/);

  const res = part1(lines);
  expect(res.codeCount).toBe(4);
  expect(res.memCount).toBe(1);
  expect(res.result).toBe(3);
});

test("with escaped quotes", () => {
  const lines = fs
    .readFileSync("test_inputs/day08/escaped-quotes")
    .toString()
    .split(/\r?\n/);

  const res = part1(lines);
  expect(res.codeCount).toBe(4);
  expect(res.memCount).toBe(1);
  expect(res.result).toBe(3);
});

test("with escaped hex", () => {
  const lines = fs
    .readFileSync("test_inputs/day08/escaped-hex")
    .toString()
    .split(/\r?\n/);

  const res = part1(lines);
  expect(res.codeCount).toBe(6);
  expect(res.memCount).toBe(1);
  expect(res.result).toBe(5);
});

test("handle escaped slash", () => {
  const lines = fs
    .readFileSync("test_inputs/day08/escaped-slashes")
    .toString()
    .split(/\r?\n/);

  const r = handleEscapedSlash(lines[0].split(""), 1);
  expect(r.index).toBe(3);
  expect(r.memChars).toBe(1);
});

test("handle escaped quote", () => {
  const lines = fs
    .readFileSync("test_inputs/day08/escaped-quotes")
    .toString()
    .split(/\r?\n/);

  const r = handleEscapedQuote(lines[0].split(""), 1);
  expect(r.index).toBe(3);
  expect(r.memChars).toBe(1);
});

test("handle escaped hex", () => {
  const lines = fs
    .readFileSync("test_inputs/day08/escaped-hex")
    .toString()
    .split(/\r?\n/);

  const r = handleEscapedHex(lines[0].split(""), 1);
  expect(r.index).toBe(5);
  expect(r.memChars).toBe(1);
});

test("part 2, example 1", () => {
  const lines = fs
    .readFileSync("test_inputs/day08/double-quotes")
    .toString()
    .split(/\r?\n/);

  expect(computeEncodedCount(lines)).toBe(6);
});

test("part 2, example 2", () => {
  const lines = fs
    .readFileSync("test_inputs/day08/part2-example2")
    .toString()
    .split(/\r?\n/);

  expect(computeEncodedCount(lines)).toBe(9);
});

test("part 2, example 3", () => {
  const lines = fs
    .readFileSync("test_inputs/day08/part2-example3")
    .toString()
    .split(/\r?\n/);

  expect(computeEncodedCount(lines)).toBe(16);
});

test("part 2, example 4", () => {
  const lines = fs
    .readFileSync("test_inputs/day08/part2-example4")
    .toString()
    .split(/\r?\n/);

  expect(computeEncodedCount(lines)).toBe(11);
});

test("part 2, simple strings", () => {
  const lines = fs
    .readFileSync("test_inputs/day08/simple-strings")
    .toString()
    .split(/\r?\n/);

  expect(computeEncodedCount(lines)).toBe(16);
});
