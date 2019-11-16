import { loadInput } from './utils';

const lines = loadInput(1);

const data = lines[0];
var floor = 0;
var position = 0;
var negativePosition: number = -1;

data.split('').forEach(letter => {
    position += 1;
    if (letter === '(') {
        floor += 1;
    } else {
        floor -= 1;
    }
    if (floor < 0 && negativePosition == -1) {
        negativePosition = position;
    }
})

console.log('Part 1: ' + floor);
console.log('Part 2: ' + negativePosition)