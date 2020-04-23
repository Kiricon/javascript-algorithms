import BinarySearchTreeNode from './BinarySearchTreeNode';

export default class BinarySearchTree {
  constructor() {
    this.root = new BinarySearchTreeNode();
  }

  insert(val) { return this.root.insert(val); }

  toString() { return this.root.toString(); }

  contains(val) { return this.root.contains(val); }

  remove(val) { return this.root.remove(val); }
}
