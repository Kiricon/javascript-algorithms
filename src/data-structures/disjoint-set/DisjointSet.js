import DisjointSetItem from './DisjointSetItem';

export default class DisjointSet {
  constructor(keyExtraction) {
    this.items = {};
    this.keyExtraction = keyExtraction;
  }

  makeSet(value) {
    const newItem = new DisjointSetItem(value, this.keyExtraction);
    this.items[newItem.getKey()] = newItem;
    return this;
  }

  find(value) {
    const templateDisjointItem = new DisjointSetItem(value, this.keyExtraction);

    // Try to find item itself;
    const requiredDisjointItem = this.items[templateDisjointItem.getKey()];

    if (!requiredDisjointItem) {
      return null;
    }

    return requiredDisjointItem.getRoot().getKey();
  }

  union(valueA, valueB) {
    const itemARoot = this.find(valueA);
    const itemBRoot = this.find(valueB);

    if (!itemARoot || !itemBRoot) {
      throw new Error('Trying to merge two sets that don\'t exist');
    }

    if (itemARoot === itemBRoot) return this;

    const rootA = this.items[itemARoot];
    const rootB = this.items[itemBRoot];
    if (rootA.getRank() >= rootB.getRank()) {
      rootA.addChild(rootB);
      return this;
    }

    rootB.addChild(rootA);
    return this;
  }

  inSameSet(valueA, valueB) {
    const itemARoot = this.find(valueA);
    const itemBRoot = this.find(valueB);

    if (!itemARoot || !itemBRoot) {
      throw new Error('One or more sets doesn\'t exist...');
    }

    return itemARoot === itemBRoot;
  }
}
