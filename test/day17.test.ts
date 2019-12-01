import { countValidCombos, Jar } from "../src/day17";

const jars: Jar[] = [
  new Jar(0, 20),
  new Jar(1, 15),
  new Jar(2, 10),
  new Jar(3, 5),
  new Jar(4, 5)
];

test("test the example", () => {
  const combos = countValidCombos(25, [], jars);
  expect(combos.length).toBe(4);
});
