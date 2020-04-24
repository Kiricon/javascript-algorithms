import BinarySearchTree from '../binary-search-tree/BinarySearchTree';

const Color = {
  Key: 'color',
  Black: 'black',
  Red: 'red',
};

export default class RedBlackTree extends BinarySearchTree {
  insert(val) {
    const node = super.insert(val);
    // Set root to black
    if (this.root === node) {
      this.makeNodeBlack(node);
    } else {
      this.makeNodeRed(node);
    }

    this.balance(node);

    return node;
  }

  makeNodeBlack(node) { return node.meta.set(Color.Key, Color.Black); }

  makeNodeRed(node) { return node.meta.set(Color.Key, Color.Red); }

  isNodeColored(node) {
    return node.meta.has(Color.Key);
  }

  isNodeBlack(node) {
    if (!this.isNodeColored(node)) return false;
    return node.meta.get(Color.Key) === Color.Black;
  }

  isNodeRed(node) {
    if (!this.isNodeColored(node)) return false;
    return node.meta.get(Color.Key) === Color.Red;
  }

  balance(node) {
    if (node === this.root || this.isNodeBlack(node.parent)) return;
    const grandParent = node.parent.parent;

    if (node.uncle && this.isNodeRed(node.uncle)) {
      this.makeNodeBlack(node.uncle);
      this.makeNodeBlack(node.parent);
      if (grandParent !== this.root) {
        // Recolor grand-parent to red if it is not root.
        this.makeNodeRed(grandParent);
      } else {
        // If grand-parent is black root don't do anything.
        // Since root already has two black sibling that we've just recolored.
        return;
      }

      this.balance(grandParent);
    } else if (!node.uncle || this.isNodeBlack(node.uncle)) {
      if (grandParent) {
        let newGrandParent;
        if (grandParent.left === node.parent) {
          // left
          if (node.parent.left === node) {
            // Left-Left
            newGrandParent = this.leftLeftRotate(grandParent);
          } else {
            // left-right
            newGrandParent = this.leftRightRotate(grandParent);
          }
        } else {
          // right
          if (node.parent.right === node) {
            // right-right
            newGrandParent = this.rightRightRotate(grandParent);
          } else {
            // right-left
            newGrandParent = this.rightLeftRotate(grandParent);
          }
        }

        if (newGrandParent && newGrandParent.parent === null) {
          this.root = newGrandParent;

          // Recolor root into black.
          this.makeNodeBlack(this.root);
        }

        this.balance(newGrandParent);
      }
    }
  }

  leftLeftRotate(grandParent) {
    const grandGrandParent = grandParent.parent;
    const grandParentIsLeft = grandGrandParent && grandGrandParent.left === grandParent;
    const parent = grandParent.left;

    grandParent.setLeft(parent.right);
    parent.setRight(grandParent);

    if (grandGrandParent) {
      if (grandParentIsLeft) {
        grandGrandParent.setLeft(parent);
      } else {
        grandGrandParent.setRight(parent);
      }
    } else {
      parent.parent = null;
    }

    this.swapNodeColors(parent, grandParent);

    return parent;
  }

  leftRightRotate(grandParent) {
    const parent = grandParent.left;
    const child = parent.right;

    const childLeft = child.left;

    parent.setRight(childLeft);
    grandParent.setLeft(child);
    child.setLeft(parent);

    return this.leftLeftRotate(grandParent);
  }

  rightRightRotate(grandParent) {
    const grandGrandParent = grandParent.parent;
    const grandParentIsRight = grandGrandParent && grandGrandParent.right === grandParent;
    const parent = grandParent.right;

    grandParent.setRight(parent.left);
    parent.setLeft(grandParent);

    if (grandGrandParent) {
      if (grandParentIsRight) {
        grandGrandParent.setRight(parent);
      } else {
        grandGrandParent.setLeft(parent);
      }
    } else {
      parent.parent = null;
    }

    this.swapNodeColors(parent, grandParent);

    return parent;
  }

  rightLeftRotate(grandParent) {
    const parent = grandParent.right;
    const child = parent.left;

    const childRight = child.right;

    parent.setLeft(childRight);
    grandParent.setRight(child);
    child.setRight(parent);

    return this.rightRightRotate(grandParent);
  }

  swapNodeColors(node1, node2) {
    const node1Color = node1.meta.get(Color.Key);
    const node2Color = node2.meta.get(Color.Key);

    node1.meta.set(Color.Key, node2Color);
    node2.meta.set(Color.Key, node1Color);
  }
}
