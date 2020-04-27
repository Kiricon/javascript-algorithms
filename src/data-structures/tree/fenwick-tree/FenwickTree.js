export default class FenwickTree {
  constructor(treeSize) {
    this.treeArray = new Array(treeSize + 1).fill(0);
    this.treeSize = treeSize;
  }

  increase(index, value) {
    if (index < 1 || index > this.treeSize) {
      throw new Error('Position is out of allowed range');
    }

    for (let i = index; i <= this.treeSize; i += (i & -i)) {
      this.treeArray[i] += value;
    }

    return this;
  }

  query(index) {
    if (index > this.treeSize || index <= 0) {
      throw new Error('Out of range');
    }

    let value = 0;
    for (let i = index; i > 0; i -= (i & -i)) {
      value += this.treeArray[i];
    }

    return value;
  }

  queryRange(leftIndex, rightIndex) {
    if (leftIndex > rightIndex) {
      throw new Error('Left index can not be greater than right one');
    }

    if (leftIndex === 1) {
      return this.query(rightIndex);
    }

    return this.query(rightIndex) - this.query(leftIndex - 1);
  }
}
