import Comparator from '../../utils/comparator/Comparator';

// Parent: (index -2)/2
// Left Child: (index * 2) + 1
// Right Child: (index * 2) + 1;

export default class Heap {
  constructor(comparatorFunction) {
    if (new.target === Heap) {
      throw new TypeError('Cannot construct Heap instance directly');
    }

    this.heapContainer = [];
    this.compare = new Comparator(comparatorFunction);
  }

  peek() {
    const topNode = this.heapContainer[0];
    return topNode || null;
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getParent(index) {
    return this.heapContainer[this.getParentIndex(index)];
  }

  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  getLeftChildIndex(index) {
    return (index * 2) + 1;
  }

  getLeftChild(index) {
    return this.heapContainer[this.getLeftChildIndex(index)];
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.heapContainer.length;
  }

  getRightChildIndex(index) {
    return (index * 2) + 2;
  }

  getRightChild(index) {
    return this.heapContainer[this.getRightChildIndex(index)];
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.heapContainer.length;
  }

  swap(indexOne, indexTwo) {
    const temp = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = temp;
  }

  heapUp(startIndex) {
    let index = startIndex || this.heapContainer.length - 1;
    while (
      this.hasParent(index)
&& this.pairIsInCorrectOrder(this.heapContainer[index], this.getParent(index))
    ) {
      const parentIndex = this.getParentIndex(index);
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  poll() {
    if (this.heapContainer.length === 0) {
      return null;
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    }

    const item = this.heapContainer[0];

    // Move the last element from the end to the head.
    this.heapContainer[0] = this.heapContainer.pop();
    this.heapDown();

    return item;
  }

  heapDown(customStartIndex = 0) {
    // Compare the parent element to its children and swap parent with the appropriate
    // child (smallest child for MinHeap, largest child for MaxHeap).
    // Do the same for next children after swap.
    let currentIndex = customStartIndex;
    let nextIndex = null;

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex)
        && this.pairIsInCorrectOrder(
          this.getRightChild(currentIndex),
          this.getLeftChild(currentIndex),
        )
      ) {
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }

      if (this.pairIsInCorrectOrder(
        this.heapContainer[currentIndex],
        this.heapContainer[nextIndex],
      )) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  add(val) {
    this.heapContainer.push(val);
    this.heapUp();
  }

  isEmpty() {
    return this.heapContainer.length === 0;
  }

  toString() {
    return this.heapContainer.join(',');
  }

  find(val, customCompare) {
    const arr = [];
    this.heapContainer.forEach((v, i) => {
      if (customCompare) {
        if (customCompare.equal(v, val)) {
          arr.push(i);
        }
      } else {
        if (v === val) {
          arr.push(i);
        }
      }
    });

    return arr;
  }

  pairIsInCorrectOrder(firstElement, secondElement) {
    throw new Error(`
      You have to implement heap pair comparision method
      for ${firstElement} and ${secondElement} values.
    `);
  }

  remove(val, customCompare) {
    const itemsToRemove = this.find(val, customCompare).length;
    for (let itteration = 0; itteration < itemsToRemove; itteration += 1) {
      const indexToRemove = this.find(val, customCompare).pop();

      if (indexToRemove === this.heapContainer.length - 1) {
        this.heapContainer.pop();
      } else {
        this.heapContainer[indexToRemove] = this.heapContainer.pop();
        this.heapDown(indexToRemove);
      }
    }

    return this;
  }
}
