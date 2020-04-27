import LinkedList from '../linked-list/LinkedList';

export default class GraphVertex {
  constructor(value) {
    if (!value) {
      throw new Error('Vertex must have a value');
    }

    const edgeComparator = (edgeA, edgeB) => {
      if (edgeA.getKey() === edgeB.getKey()) {
        return 0;
      }

      return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
    };

    // Normally you would store string value like vertex name.
    // But generally it may be any object as well
    this.value = value;
    this.edges = new LinkedList(edgeComparator);
  }

  toString() {
    return this.value;
  }

  getKey() {
    return this.toString();
  }

  getEdges() {
    return this.edges.toArray().map(node => node.value);
  }

  addEdge(edge) {
    this.edges.append(edge);
    return this;
  }

  findEdge(vertex) {
    const node = this.edges.find({
      callback: edge => (
        edge.startVertex === vertex || edge.endVertex === vertex
      ),
    });
    if (node) return node.value;
    return null;
  }

  hasEdge(requiredEdge) {
    const edgeNode = this.edges.find({
      callback: edge => edge === requiredEdge,
    });

    return !!edgeNode;
  }

  deleteEdge(edge) {
    this.edges.delete(edge);
  }

  deleteAllEdges() {
    this.edges.deleteHead();
    this.edges.deleteTail();
  }

  getNeighbors() {
    const arr = this.edges.toArray();
    return arr
      .filter(e => e.value.startVertex === this || e.value.endVertex === this)
      .map(e => (e.value.endVertex === this ? e.value.startVertex : e.value.endVertex));
  }

  hasNeighbor(vertex) {
    return this.getNeighbors().includes(vertex);
  }

  getDegree() {
    return this.getEdges().length;
  }
}
