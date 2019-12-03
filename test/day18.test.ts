import {
  parseInput,
  animate,
  countLightsThatAreOn,
  enableCorners
} from "../src/day18";

const lines = [".#.#.#", "...##.", "#....#", "..#...", "#.#..#", "####.."];

test("test the part 1 example", () => {
  const lights = parseInput(lines);
  // console.log(lights);
  animate(lights, 4, false);
  // console.log("lights", lights);
  expect(countLightsThatAreOn(lights)).toBe(4);
});

test("test the part 2 example", () => {
  const lights = parseInput(lines);
  enableCorners(lights);
  // console.log(lights);
  animate(lights, 5, true);
  // console.log("lights", lights);
  expect(countLightsThatAreOn(lights)).toBe(17);
});
