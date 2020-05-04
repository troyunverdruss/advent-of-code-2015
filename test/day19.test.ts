import { part1, parseInput } from "../src/day19";

const lines = ["H => HO", "H => OH", "O => HH", "HOH"];

test("parsing the input", () => {
  const { conversions, molecule } = parseInput(lines);

  expect(conversions.size).toBe(2);

  expect(molecule[0]).toBe("H");
  expect(molecule[1]).toBe("O");
  expect(molecule[2]).toBe("H");
  expect(molecule).toStrictEqual(["H", "O", "H"]);

  expect(conversions.get("H")).toStrictEqual(["HO", "OH"]);
  expect(conversions.get("O")).toStrictEqual(["HH"]);
});

test("parsing more complicated molecule", () => {
  const { conversions, molecule } = parseInput(["Al => H", "H => OH", "HAlH"]);

  expect(conversions.size).toBe(2);

  expect(molecule[0]).toBe("H");
  expect(molecule[1]).toBe("Al");
  expect(molecule[2]).toBe("H");
  expect(molecule).toStrictEqual(["H", "Al", "H"]);

  expect(conversions.get("H")).toStrictEqual(["OH"]);
  expect(conversions.get("Al")).toStrictEqual(["H"]);
});

test("test the part 1 example", () => {
  const { conversions, molecule } = parseInput(lines);

  const result = part1(molecule, conversions);

  expect(result).toBe(4);
});

// test("test the part 2 example", () => {
//   const lights = parseInput(lines);
//   enableCorners(lights);
//   // console.log(lights);
//   animate(lights, 5, true);
//   // console.log("lights", lights);
//   expect(countLightsThatAreOn(lights)).toBe(17);
// });
