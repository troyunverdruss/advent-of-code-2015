import { createGraph, findShortestPath, findLongestPath } from "../src/day09";

test("Part 1 example", () => {
  const lines = [
    "London to Dublin = 464",
    "London to Belfast = 518",
    "Dublin to Belfast = 141"
  ];

  const graph = createGraph(lines);
  const res = findShortestPath(graph);
  expect(res).toBe(605);
});

test("Part 2 example", () => {
  const lines = [
    "London to Dublin = 464",
    "London to Belfast = 518",
    "Dublin to Belfast = 141"
  ];

  const graph = createGraph(lines);
  const res = findLongestPath(graph);
  expect(res).toBe(982);
});
