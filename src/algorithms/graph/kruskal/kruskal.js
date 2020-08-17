import Graph from '../../../data-structures/graph/Graph';
import DisjointSet from '../../../data-structures/disjoint-set/DisjointSet';

function hasCycle(graph, edge, visited) {
  if (visited.has(edge.getKey())) return true;
  visited.add(edge.getKey());
  const edges = edge.endVertex.getEdges();
  for (const newEdge of edges) {
    if (newEdge === edge) continue;
    if (hasCycle(graph, newEdge, visited)) return true;
  }

  return false;
}

/**
 *
 * @param {Graph} graph
 */
export default function kruskal(graph) {
  if (graph.isDirected) throw "Can't be direct";
  const visited = new Set();

  const resultGraph = new Graph();
  const sortedEdges = graph.getAllEdges().sort((a, b) => {
    if (a.weight === b.weight) return 0;
    return a.weight < b.weight ? -1 : 1;
  });

  const disjointedSet = new DisjointSet((v) => v.getKey());

  graph.getAllVertices().forEach((v) => disjointedSet.makeSet(v));

  for (const edge of sortedEdges) {
    if (!disjointedSet.inSameSet(edge.startVertex, edge.endVertex)) {
      disjointedSet.union(edge.startVertex, edge.endVertex);
      resultGraph.addEdge(edge);
    }
  }

  return resultGraph;
}
