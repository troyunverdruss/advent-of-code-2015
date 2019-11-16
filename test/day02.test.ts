import { compute } from '../src/day02'

test('example 1', () => {
    const lines = ['2x3x4'];
    const [paper, ribbon] = compute(lines);
    expect(paper).toBe(58);
    expect(ribbon).toBe(34);
});

test('example 2', () => {
    const lines = ['1x1x10'];
    const [paper, ribbon] = compute(lines);
    expect(paper).toBe(43);
    expect(ribbon).toBe(14);
});
