import {loadInput} from "./utils";

export function findSequenceNumber(row: number, column: number) {
  // find starting value for row
  let rowVal = 1

  for (let i = 1; i < row; i++) {
    rowVal += i
  }
  // console.log(`first val in row: ${rowVal}`)

  let colVal = rowVal
  let colInc = row + 1
  for (let i = 1; i < column; i++) {
    colVal += colInc
    colInc += 1
  }
  // console.log(`${row} ${column} val in col: ${colVal}`)

  return colVal
}

export function part1(row: number, column: number): number {
  const sequenceNumber = findSequenceNumber(row, column);

  let resultNumber = 20151125
  for (let i = 1; i < sequenceNumber; i++) {
    resultNumber = (resultNumber * 252533) % 33554393
  }

  return resultNumber
}

export function parseInput(input: string) {

  const rowMatch = input.match(/row (\d+),/)
  if (!rowMatch) {
    throw Error('couldnt find row')
  }
  const row = parseInt(rowMatch[1]);

  const columnMatch = input.match(/column (\d+)/)
  if (!columnMatch) {
    throw Error('couldnt find column')
  }
  const column = parseInt(columnMatch[1]);

  return {row, column};
}

if (require.main === module) {
  const input = loadInput(25).filter((l) => l != "")[0];
  const {row, column} = parseInput(input);

  console.log(`Part 1: ${part1(row, column)}`)
}
