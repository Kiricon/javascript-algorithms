export default function depthFirstSearch(
  graph,
  vertex,
  callbacks,
  seen,
  prev = null
) {
  seen = seen || new Set();
  seen.add(vertex.value);
  const callInfo = {
    currentVertex: vertex,
    previousVertex: prev,
  };
  if (callbacks) callbacks.enterVertex(callInfo);

  vertex.getNeighbors().forEach((neighborVertex) => {
    if (!seen.has(neighborVertex.value)) {
      depthFirstSearch(graph, neighborVertex, callbacks, seen, vertex);
    }
  });

  if (callbacks) callbacks.leaveVertex(callInfo);
}
