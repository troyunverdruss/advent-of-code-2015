import {
  part1,
  parseInput,
  part2,
  findValidNextStates,
  parseMoleculeString,
  levenshtein, Replacer
} from '../src/day19';

const lines = ['H => HO', 'H => OH', 'O => HH', 'HOH'];
const part2Lines = [
  'e => H',
  'e => O',
  'H => HO',
  'H => OH',
  'O => HH'

]

test('parsing the input', () => {
  const {conversions, molecule} = parseInput(lines);

  expect(conversions.size).toBe(2);

  expect(molecule[0]).toBe('H');
  expect(molecule[1]).toBe('O');
  expect(molecule[2]).toBe('H');
  expect(molecule).toStrictEqual(['H', 'O', 'H']);

  expect(conversions.get('H')).toStrictEqual(['HO', 'OH']);
  expect(conversions.get('O')).toStrictEqual(['HH']);
});

test('parsing more complicated molecule', () => {
  const {conversions, molecule} = parseInput(['Al => H', 'H => OH', 'HAlH']);

  expect(conversions.size).toBe(2);

  expect(molecule[0]).toBe('H');
  expect(molecule[1]).toBe('Al');
  expect(molecule[2]).toBe('H');
  expect(molecule).toStrictEqual(['H', 'Al', 'H']);

  expect(conversions.get('H')).toStrictEqual(['OH']);
  expect(conversions.get('Al')).toStrictEqual(['H']);
});

test('test the part 1 example', () => {
  const {conversions, molecule} = parseInput(lines);

  const result = part1(molecule, conversions);

  expect(result).toBe(4);
});

test('test the part 2 example - 1', () => {
  const {conversions, molecule} = parseInput(part2Lines.concat(['HOH']));

  const result = part2(molecule, conversions);

  expect(result).toBe(3);
});

test('test the part 2 example - 2', () => {
  const {conversions, molecule} = parseInput(part2Lines.concat(['HOHOHO']));

  const result = part2(molecule, conversions);

  expect(result).toBe(6);
});

test('find next states from e', () => {
  const {conversions} = parseInput(part2Lines);

  const states = findValidNextStates(conversions, parseMoleculeString('e'))
  console.log(states)
  expect(states).toStrictEqual(['H', 'O'])

})

test('find next states from H', () => {
  const {conversions} = parseInput(part2Lines);

  const states = findValidNextStates(conversions, parseMoleculeString('H'))
  console.log(states)
  expect(states).toStrictEqual(['HO', 'OH'])

})

test('find next states from O', () => {
  const {conversions} = parseInput(part2Lines.concat([""]));

  const states = findValidNextStates(conversions, parseMoleculeString('O'))
  console.log(states)
  expect(states).toStrictEqual(['HH'])

})

test('find next states from HO', () => {
  const {conversions} = parseInput(part2Lines.concat([""]));

  const states = findValidNextStates(conversions, parseMoleculeString('HO'))
  console.log(states)
  expect(states).toStrictEqual(['HOO', 'OHO', 'HHH'])

})

test('find next states from OH', () => {
  const {conversions} = parseInput(part2Lines.concat([""]));

  const states = findValidNextStates(conversions, parseMoleculeString('OH'))
  console.log(states)
  expect(states).toStrictEqual(['HHH', 'OHO', 'OOH'])

})


test('find next states from HH', () => {
  const {conversions} = parseInput(part2Lines);

  const states = findValidNextStates(conversions, parseMoleculeString('HH'))
  console.log(states)
  expect(states).toStrictEqual(['HOH', 'OHH', 'HHO'])

})

test('lev 1', () => {
  const d = levenshtein('test'.split(''), 'text'.split(''))
  expect(d).toBe(1)
})

test('lev 2', () => {
  const d = levenshtein('bashful'.split(''), 'happy'.split(''))
  expect(d).toBe(6)
})

test('test replacer', () => {
  const replacer = new Replacer()
  const e = replacer.getReplacement('e')
  const h = replacer.getReplacement('h')
  const o = replacer.getReplacement('o')

  expect(replacer.getReplacement('e')).toBe(e)
  expect(replacer.getReplacement('h')).toBe(h)
  expect(replacer.getReplacement('o')).toBe(o)
})
