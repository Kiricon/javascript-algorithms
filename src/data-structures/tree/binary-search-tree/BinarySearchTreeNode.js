import BinaryTreeNode from '../BinaryTreeNode';

export default class BinarySearchTreeNode extends BinaryTreeNode {
  insert(value) {
    const newNode = new BinarySearchTreeNode(value);
    if (this.value === null) {
      this.value = value;
      return this;
    }

    const deepInsert = (node) => {
      if (node.value === value) return node;

      if (value > node.value) {
        if (!node.right) {
          node.setRight(newNode);
          return;
        }
        deepInsert(node.right);
      } else {
        if (!node.left) {
          node.setLeft(newNode);
          return;
        }
        deepInsert(node.left);
      }
    };

    deepInsert(this);
    return newNode;
  }

  find(value) {
    const deepSearch = (node) => {
      if (!node) return null;
      if (node.value === value) return node;
      return deepSearch(node.left) || deepSearch(node.right);
    };

    return deepSearch(this);
  }

  contains(value) {
    return !!this.find(value);
  }

  findMin() {
    const deepMinSearch = (node) => {
      if (!node.left) return node;
      return deepMinSearch(node.left);
    };

    return deepMinSearch(this);
  }

  remove(value) {
    const deleteNode = this.find(value);

    // Remove Childless nodes
    if (!deleteNode.left && !deleteNode.right) {
      if (deleteNode.parent) {
        deleteNode.parent.removeChild(deleteNode);
        deleteNode.parent = null;
      } else {
        deleteNode.setValue(undefined);
      }
      return true;
    }

    // Remove node with one child
    if (!deleteNode.left || !deleteNode.right) {
      const replacementNode = deleteNode.left || deleteNode.right;
      replacementNode.parent = deleteNode.parent;
      if (deleteNode.parent) {
      	deleteNode.parent.removeChild(deleteNode);
        deleteNode.parent.insert(replacementNode);
        deleteNode.parent = null;
      } else {
        BinaryTreeNode.copyNode(replacementNode, deleteNode);
      }
      return true;
    }

    // Remove node with two children
    const rightBranchMin = deleteNode.right.findMin();
    // Delete it from it's parent and take all of the deleted nodes's references
    if (deleteNode.right !== rightBranchMin) {
      rightBranchMin.parent.removeChild(rightBranchMin);
      rightBranchMin.parent = null;
      deleteNode.setValue(rightBranchMin.value);
    } else {
      deleteNode.setValue(deleteNode.right.value);
      deleteNode.setRight(deleteNode.right.right);
    }


    return true;
  }
}
