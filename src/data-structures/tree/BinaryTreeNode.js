/* eslint-disable no-param-reassign */
import HashTable from '../hash-table/HashTable';

export default class BinaryTreeNode {
  constructor(value) {
    this.value = value || null;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.meta = new HashTable();
  }

  setLeft(node) {
    if (node) node.parent = this;
    this.left = node;
    return this;
  }

  setRight(node) {
    if (node) node.parent = this;
    this.right = node;
    return this;
  }

  removeChild(node) {
    if (!node) return false;

    if (this.left === node) {
      this.left = null;
      return true;
    }

    if (this.right === node) {
      this.right = null;
      return true;
    }

    return false;
  }

  traverseInOrder() {
    const arr = [];
    const deepTraverse = (node) => {
      if (node.left) deepTraverse(node.left);
      arr.push(node.value);
      if (node.right) deepTraverse(node.right);
    };

    deepTraverse(this);
    return arr;
  }

  replaceChild(toBeReplaced, replacement) {
    if (toBeReplaced === replacement) return true;
    if (!toBeReplaced || !replacement || !toBeReplaced.parent) return false;

    replacement.parent = toBeReplaced.parent;


    if (toBeReplaced.parent.left === toBeReplaced) {
      replacement.parent.left = replacement;
      return true;
    }

    if (toBeReplaced.parent.right === toBeReplaced) {
      replacement.parent.right = replacement;
      return true;
    }

    return false;
  }

  get rightHeight() {
    if (this.right) {
      return this.right.height + 1;
    }
    return 0;
  }

  get leftHeight() {
    if (this.left) {
      return this.left.height + 1;
    }
    return 0;
  }

  get height() {
    return Math.max(this.rightHeight, this.leftHeight);
  }

  get balanceFactor() {
    return this.leftHeight - this.rightHeight;
  }

  get uncle() {
    if (!this.parent || !this.parent.parent) return undefined;
    if (this.parent.parent.left === this.parent) {
      return this.parent.parent.right || undefined;
    }
    return this.parent.parent.left || undefined;
  }

  setValue(newVal) {
    this.value = newVal;
  }

  static copyNode(sourceNode, targetNode) {
    targetNode.setValue(sourceNode.value);
    targetNode.setLeft(sourceNode.left);
    targetNode.setRight(sourceNode.right);
  }


  toString() {
    return this.traverseInOrder().join(',');
  }
}
