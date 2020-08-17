import PriorityQueue from '../../../data-structures/priority-queue/PriorityQueue';
export default function dijkstra(graph, rootVertex) {
  // Create map of all distances for a given vertex
  // and fill the default values all with Infinity
  const distances = {};
  // Keep track of fast path and fully explored nodes
  const previousVertices = {};
  const fullyExplored = new Set();

  graph.getAllVertices().forEach((v) => {
    distances[v.getKey()] = Infinity;
    previousVertices[v.getKey()] = null;
  });

  // Set it so the root vertex's value is 0
  distances[rootVertex.getKey()] = 0;

  // Build a queue for traversing vertex in order
  const queue = new PriorityQueue();
  queue.add(rootVertex, 0);

  while (!queue.isEmpty()) {
    // Pop vertex off the top and set it as fully explored
    const vertex = queue.poll();
    const vertexKey = vertex.getKey();
    fullyExplored.add(vertexKey);
    // Grab it's current path weight
    const currWeight = distances[vertexKey];

    vertex.getEdges().forEach((edge) => {
      const pathWeight = currWeight + edge.weight;
      const endKey = edge.endVertex.getKey();

      if (pathWeight < distances[endKey]) {
        distances[endKey] = pathWeight;
        previousVertices[endKey] = vertex;
      }

      if (!fullyExplored.has(endKey))
        queue.add(edge.endVertex, distances[endKey]);
    });
  }

  return { distances, previousVertices };
}
