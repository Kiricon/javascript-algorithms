import BinarySearchTree from '../binary-search-tree/BinarySearchTree';

export default class AvlTree extends BinarySearchTree {
  insert(val) {
    super.insert(val);
    let currNode = this.root.find(val);

    while (currNode) {
      this.balance(currNode);
      currNode = currNode.parent;
    }
  }

  remove(value) {
    super.remove(value);
    this.balance(this.root);
  }

  balance(node) {
    if (node.balanceFactor > 1) {
      if (node.left.balanceFactor > 0) {
        this.leftLeftRotate(node);
      } else {
        this.leftRightRotate(node);
      }
    } else if (node.balanceFactor < -1) {
      if (node.right.balanceFactor < 0) {
        this.rightRightRotate(node);
      } else {
        this.rightLeftRotate(node);
      }
    }
  }

  leftLeftRotate(node) {
    const leftNode = node.left;

    // detach old root node's left
    node.setLeft(null);

    if (node.parent) {
      node.parent.setLeft(leftNode);
    } else {
      this.root = leftNode;
      leftNode.parent = null;
    }

    if (leftNode.right) {
      node.setLeft(leftNode.right);
    }

    leftNode.setRight(node);
  }

  leftRightRotate(node) {
    const leftNode = node.left;
    node.setLeft(null);

    const leftRightNode = leftNode.right;
    leftNode.setRight(null);

    if (leftRightNode.left) {
      leftNode.setRight(leftRightNode.left);
      leftRightNode.setLeft(null);
    }

    node.setLeft(leftRightNode);
    leftRightNode.setLeft(leftNode);

    this.leftLeftRotate(node);
  }

  rightRightRotate(node) {
    const rightNode = node.right;

    node.setRight(null);

    if (node.parent) {
      node.parent.setRight(rightNode);
    } else {
      this.root = rightNode;
      rightNode.parent = null;
    }

    if (rightNode.left) {
      node.setRight(rightNode.left);
    }

    rightNode.setLeft(node);
  }

  rightLeftRotate(node) {
    const rightNode = node.right;
    node.setRight(null);

    const rightLeftNode = rightNode.left;
    rightNode.setLeft(null);

    if (rightLeftNode.right) {
      rightNode.setLeft(rightLeftNode.right);
      rightLeftNode.setRight(null);
    }
    node.setRight(rightLeftNode);
    rightLeftNode.setRight(rightNode);

    this.rightRightRotate(node);
  }
}
