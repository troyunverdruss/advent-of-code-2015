import { Graph, alg } from "graphlib";
import { loadInput } from "./utils";

import * as itertools from "itertools";

export function createGraph(lines: string[]): Graph {
  const g = new Graph();
  lines.forEach(line => {
    const tokens = line.split(/\s+/);
    g.setNode(tokens[0], tokens[0]);
    g.setNode(tokens[2], tokens[2]);
    g.setEdge(tokens[0], tokens[2], Number.parseInt(tokens[4]));
    g.setEdge(tokens[2], tokens[0], Number.parseInt(tokens[4]));
  });

  return g;
}

export function findShortestPath(graph: Graph): number {
  let minPathLength = Number.MAX_SAFE_INTEGER;
  for (const path of itertools.permutations(graph.nodes())) {
    let curPathLength = 0;

    for (let i = 0; i < path.length - 1; i++) {
      const edge = graph.edge(path[i], path[i + 1]);
      if (edge === undefined) {
        curPathLength = Number.MAX_SAFE_INTEGER;
        break;
      }

      curPathLength += Number.parseInt(edge);
    }

    if (curPathLength < minPathLength) {
      minPathLength = curPathLength;
    }
  }
  return minPathLength;
}

export function findLongestPath(graph: Graph): number {
  let maxPathLength = 0;
  for (const path of itertools.permutations(graph.nodes())) {
    let curPathLength = 0;

    for (let i = 0; i < path.length - 1; i++) {
      const edge = graph.edge(path[i], path[i + 1]);
      if (edge === undefined) {
        curPathLength = 0;
        break;
      }

      curPathLength += Number.parseInt(edge);
    }

    if (curPathLength > maxPathLength) {
      maxPathLength = curPathLength;
    }
  }
  return maxPathLength;
}

if (require.main === module) {
  const lines = loadInput(9).filter(l => l !== "");
  const graph = createGraph(lines);

  console.log(`Part 1: ${findShortestPath(graph)}`);
  console.log(`Part 2: ${findLongestPath(graph)}`);
}
