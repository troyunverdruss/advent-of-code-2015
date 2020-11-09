import {Computer} from "../src/day23";

test('example', () => {
  const instructions = [
    'inc a',
    'jio a, +2',
    'tpl a',
    'inc a'
  ]

  const computer = new Computer(instructions)
  computer.run()
  const a = computer.registers.get('a')
  expect(a).toBe(2)
})

test('test jumps', () => {
  const instructions = [
    'inc a',
    'jio a, +2',
    'tpl a',
    'inc a',
    'jie a -2',
    'jmp 2',
    'inc a'
  ]

  const computer = new Computer(instructions)
  computer.run()
  const a = computer.registers.get('a')
  expect(a).toBe(7)
})
