import {
  part1,
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

  const [res, char, mem] = part1(lines);
  expect(char).toBe(2);
  expect(mem).toBe(0);
  expect(res).toBe(2);
});

test("normal strings", () => {
  const lines = fs
    .readFileSync("test_inputs/day08/simple-strings")
    .toString()
    .split(/\r?\n/);

  const [res, char, mem] = part1(lines);
  expect(char).toBe(8);
  expect(mem).toBe(4);
  expect(res).toBe(4);
});

test("with escaped slashes", () => {
  const lines = fs
    .readFileSync("test_inputs/day08/escaped-slashes")
    .toString()
    .split(/\r?\n/);

  const [res, char, mem] = part1(lines);
  expect(char).toBe(4);
  expect(mem).toBe(1);
  expect(res).toBe(3);
});

test("with escaped quotes", () => {
  const lines = fs
    .readFileSync("test_inputs/day08/escaped-quotes")
    .toString()
    .split(/\r?\n/);

  const [res, char, mem] = part1(lines);
  expect(char).toBe(4);
  expect(mem).toBe(1);
  expect(res).toBe(3);
});

test("with escaped hex", () => {
  const lines = fs
    .readFileSync("test_inputs/day08/escaped-hex")
    .toString()
    .split(/\r?\n/);

  const [res, char, mem] = part1(lines);
  expect(char).toBe(6);
  expect(mem).toBe(1);
  expect(res).toBe(5);
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
