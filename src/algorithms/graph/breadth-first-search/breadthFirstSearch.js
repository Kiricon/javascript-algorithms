export default function breadthFirstSearch(graph, vertex, cbs) {
  const visited = new Set();
  if (!cbs) {
    cbs = {
      enterVertex: () => true,
      leaveVertex: () => true,
    };
  }
  if (!cbs.allowTraversal)
    cbs.allowTraversal = ({ currentVertex, nextVertex }) =>
      !visited.has(nextVertex.value);

  const queue = [];
  queue.push(vertex);
  visited.add(vertex.value);

  let previousVertex = null;
  let currentVertex = null;
  while (queue.length) {
    previousVertex = currentVertex;
    currentVertex = queue.shift();
    cbs.enterVertex({ currentVertex, previousVertex });

    currentVertex.getNeighbors().forEach((v) => {
      if (cbs.allowTraversal({ currentVertex, nextVertex: v })) {
        visited.add(v.value);
        queue.push(v);
      }
    });

    cbs.leaveVertex({ currentVertex, previousVertex });
  }
}
