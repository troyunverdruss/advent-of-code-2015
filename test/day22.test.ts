import {solve} from "../src/day22";

test('example 1', () => {
  const player = {mana: 250, hp: 10, armor: 0}
  const cost = solve(player, {hp: 13, damage: 8}, false)
  expect(cost).toBe(173+53)
})

test('example 2', () => {
  const player = {mana: 250, hp: 10, armor: 0}
  const cost = solve(player, {hp: 14, damage: 8}, false)
  expect(cost).toBe(229+113+73+173+53)
})
