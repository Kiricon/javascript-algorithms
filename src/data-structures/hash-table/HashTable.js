import LinkedList from '../linked-list/LinkedList';

export default class HashTable {
  constructor(hashSize) {
    this.buckets = Array(hashSize || 32).fill(null).map(() => new LinkedList());
    this.keys = {};
  }

  hash(key) {
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)),
      0,
    );

    // Reduce hash number so it would fit hash table size.
    return hash % this.buckets.length;
  }

  set(key, value) {
    this.keys[key] = true;
    const hash = this.hash(key);
    const linkedList = this.buckets[hash];
    const existingNode = linkedList.find({ callback: node => node.key === key });
    if (!existingNode) {
      linkedList.append({ key, value });
    } else {
      existingNode.value = { key, value };
    }
  }

  get(key) {
    const foundNode = this.findNode(key);
    return foundNode ? foundNode.value.value : undefined;
  }

  delete(key) {
    if (this.keys[key]) {
      this.keys[key] = false;
      const hash = this.hash(key);
      const linkedList = this.buckets[hash];
      const foundNode = linkedList.find({ callback: node => node.key === key });
      return linkedList.delete(foundNode.value);
    }

    return null;
  }

  findNode(key) {
    const hash = this.hash(key);
    const foundNode = this.buckets[hash].find({ callback: node => node.key === key });
    return foundNode;
  }

  has(key) {
    return !!this.keys[key];
  }

  getKeys() {
    return Object.keys(this.keys);
  }
}
