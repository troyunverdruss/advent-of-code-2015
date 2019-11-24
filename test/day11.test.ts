import {
  computeNextEntry,
  hasTwoPairs,
  computeNextPassword,
  hasIncreasingStraight,
  doesNotHaveIllegalLetters
} from "../src/day11";

test("z inc to aa", () => {
  const r = computeNextEntry("z".split(""));
  expect(r.join("")).toBe("aa");
});

test("aa inc", () => {
  const r = computeNextEntry("aa".split(""));
  expect(r.join("")).toBe("ab");
});

test("az inc and wrap", () => {
  const r = computeNextEntry("az".split(""));
  expect(r.join("")).toBe("ba");
});

test("azz inc and multi wrap", () => {
  const r = computeNextEntry("azz".split(""));
  expect(r.join("")).toBe("baa");
});

test("pairs testing", () => {
  expect(hasTwoPairs("aaa".split(""))).toBe(false);
  expect(hasTwoPairs("aaaa".split(""))).toBe(false);
  expect(hasTwoPairs("aabb".split(""))).toBe(true);
  expect(hasTwoPairs("aacbb".split(""))).toBe(true);
});

test("next passwords 1", () => {
  expect(computeNextPassword("abcdefgh")).toBe("abcdffaa");
});

// test("next passwords 2", () => {
//   expect(computeNextPassword("ghijklmn")).toBe("ghjaabcc");
// });

test("next passwords 3, but rounded up since i is illegal", () => {
  expect(computeNextPassword("ghjaaaaa")).toBe("ghjaabcc");
});

test("example conditions 1", () => {
  expect(hasIncreasingStraight("hijklmmn".split(""))).toBe(true);
  expect(doesNotHaveIllegalLetters("hijklmmn".split(""))).toBe(false);
  expect(hasTwoPairs("hijklmmn".split(""))).toBe(false);
});

test("example conditions 2", () => {
  expect(hasIncreasingStraight("abbceffg".split(""))).toBe(false);
  expect(doesNotHaveIllegalLetters("abbceffg".split(""))).toBe(true);
  expect(hasTwoPairs("abbceffg".split(""))).toBe(true);
});

test("example conditions 3", () => {
  expect(hasIncreasingStraight("abbcegjk".split(""))).toBe(false);
  expect(doesNotHaveIllegalLetters("abbcegjk".split(""))).toBe(true);
  expect(hasTwoPairs("abbcegjk".split(""))).toBe(false);
});
