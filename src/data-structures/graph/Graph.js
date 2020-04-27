export default class Graph {
  constructor(isDirected) {
    this.vertexs = {};
    this.edges = {};
    this.isDirected = isDirected;
  }

  addVertex(vertex) {
    this.vertexs[vertex.getKey()] = vertex;
    return this;
  }

  getAllVertices() {
    return Object.values(this.vertexs);
  }

  getVertexByKey(key) {
    return this.vertexs[key];
  }

  addEdge(edge) {
    if (this.edges[edge.getKey()]) {
      throw new Error('Edge already in graph');
    }

    this.edges[edge.getKey()] = edge;
    this.vertexs[edge.startVertex.getKey()] = edge.startVertex;
    this.vertexs[edge.endVertex.getKey()] = edge.endVertex;

    edge.startVertex.addEdge(edge);
    if (!this.isDirected) {
      edge.endVertex.addEdge(edge);
    }

    return this;
  }

  getAllEdges() {
    return Object.values(this.edges);
  }

  findEdge(vertexA, vertexB) {
    const edge = this.edges[`${vertexA.getKey()}_${vertexB.getKey()}`];
    const edgeReversed = this.isDirected ? null : this.edges[`${vertexB.getKey()}_${vertexA.getKey()}`];
    return edge || edgeReversed || null;
  }

  getNeighbors(vertex) {
    return vertex.getNeighbors();
  }

  getWeight() {
    let sum = 0;
    Object.values(this.edges).forEach((e) => { sum += e.weight; });
    return sum;
  }

  deleteEdge(edge) {
    if (!edge || !this.edges[edge.getKey()]) {
      throw new Error('Can\'t delete a node that isn\'t there');
    }
    edge.startVertex.deleteEdge(edge);
    edge.endVertex.deleteEdge(edge);
    delete this.edges[edge.getKey()];
  }

  toString() {
    const arr = Object.values(this.vertexs);
    return arr.map(v => v.value).join(',');
  }

  reverse() {
    Object.values(this.edges).forEach((edge) => {
      this.deleteEdge(edge);
      edge.reverse();
      this.addEdge(edge);
    });
  }

  getVerticesIndices() {
    const indices = {};
    Object.values(this.vertexs).forEach((v, index) => {
      indices[v.getKey()] = index;
    });

    return indices;
  }

  getAdjacencyMatrix() {
    const vertices = this.getAllVertices();
    const verticesIndices = this.getVerticesIndices();

    // Init matrix with infinities meaning that there is no ways of
    // getting from one vertex to another yet.
    const adjacencyMatrix = Array(vertices.length).fill(null).map(() => {
      return Array(vertices.length).fill(Infinity);
    });

    // Fill the columns.
    vertices.forEach((vertex, vertexIndex) => {
      vertex.getNeighbors().forEach((neighbor) => {
        const neighborIndex = verticesIndices[neighbor.getKey()];
        adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(vertex, neighbor).weight;
      });
    });

    return adjacencyMatrix;
  }
}
