import { Reindeer, computeResultAtTime, part2 } from "../src/day14";

const reindeer = [
  new Reindeer("Comet", 14, 10, 127),
  new Reindeer("Dancer", 16, 11, 162)
];

test("test part 2 at 1 second", () => {
  const results = computeResultAtTime(reindeer, 1);
  expect(results.length).toBe(2);
  const comet = results.filter(r => r.name == "Comet")[0];
  const dancer = results.filter(r => r.name == "Dancer")[0];

  expect(comet.distance).toBe(14);
  expect(dancer.distance).toBe(16);

  const part2Result = part2(reindeer, 1);
  expect(part2Result).toBe(1);

  const realPart2Result = part2(reindeer, 1000);
  expect(realPart2Result).toBe(689);
});
