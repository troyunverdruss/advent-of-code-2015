import {loadInput} from "../src/utils";
import {part2} from "../src/day21";

test('part 1', () => {
  const lines = loadInput(21).filter((l) => l != "");
  part2({ armor: 0, damage: 0, hp: 1})
})
