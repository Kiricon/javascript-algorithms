export default class GraphEdge {
  constructor(startVertex, endVertex, weight = 0) {
    this.startVertex = startVertex;
    this.endVertex = endVertex;
    this.weight = weight;
  }

  toString() {
    return this.getKey();
  }

  getKey() {
    return `${this.startVertex.getKey()}_${this.endVertex.getKey()}`;
  }

  reverse() {
    const temp = this.startVertex;
    this.startVertex = this.endVertex;
    this.endVertex = temp;
  }
}
