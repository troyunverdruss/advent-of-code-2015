import {loadInput} from "./utils";

export class Computer {
  pointer: number
  registers: Map<string, number>
  instructions: string[]

  constructor(instructions: string[]) {
    this.pointer = 1
    this.registers = new Map()
    this.registers.set('a', 0)
    this.registers.set('b', 0)
    this.instructions = instructions
  }

  run() {
    console.log( this.instructions.length)
    while (this.pointer > 0 && this.pointer <= this.instructions.length) {
      const [cmd, arg1, arg2] = this.instructions[this.pointer-1].split(/,? /)
      console.log(`{a. ${this.registers.get('a')} b. ${this.registers.get('b')}}`)
      console.log(`${this.pointer}: ${cmd} ${arg1} ${arg2}`)


      if (cmd === 'hlf') {
        const r = this.getOrThrow(arg1)
        this.registers.set(arg1, r / 2)
        this.pointer += 1
      } else if (cmd === 'tpl') {
        const r = this.getOrThrow(arg1)
        this.registers.set(arg1, r * 3)
        this.pointer += 1
      } else if (cmd === 'inc') {
        const r = this.getOrThrow(arg1)
        this.registers.set(arg1, r + 1)
        this.pointer += 1
      } else if (cmd === 'jmp') {
        const jump = parseInt(arg1)
        this.pointer += jump
      } else if (cmd === 'jie') {
        const r = this.getOrThrow(arg1)
        const jump = parseInt(arg2)
        if (r % 2 === 0) {
          this.pointer += jump
        } else {
          this.pointer += 1
        }
      } else if (cmd === 'jio') {
        const r = this.getOrThrow(arg1)
        const jump = parseInt(arg2)
        if (r === 1) {
          this.pointer += jump
        } else {
          this.pointer += 1
        }
      } else {
        throw Error(`Unknown command: ${cmd}`)
      }
    }
  }

  getOrThrow(key: string) {
    const r = this.registers.get(key);
    if (r === undefined) {
      throw Error(`Bad register: ${key}`)
    }
    return r
  }
}

if (require.main === module) {
  const lines = loadInput(23).filter((l) => l != "");
  const computer = new Computer(lines)
  computer.run()
  console.log(`Part 1, register b: ${computer.registers.get('b')}`)
  const computer2 = new Computer(lines)
  computer2.registers.set('a', 1)
  computer2.run()
  console.log(`Part 2, register b: ${computer2.registers.get('b')}`)

}
