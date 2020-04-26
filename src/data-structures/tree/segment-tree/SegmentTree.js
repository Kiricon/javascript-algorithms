import isPowerOfTwo from '../../../algorithms/math/is-power-of-two/isPowerOfTwo';

export default class SegmentTree {
  constructor(inputArray, operation, operationFallback) {
    this.inputArray = inputArray;
    this.operation = operation;
    this.operationFallback = operationFallback;

    this.segmentTree = this.initSegmentTree(inputArray);
    this.buildSegmentTree();
  }

  initSegmentTree(inputArray) {
    let segmentTreeArrayLength;
    const inputArrayLength = inputArray.length;

    if (isPowerOfTwo(inputArrayLength)) {
      // If original array length is a power of two.
      segmentTreeArrayLength = (2 * inputArrayLength) - 1;
    } else {
      // If original array length is not a power of two then we need to find
      // next number that is a power of two and use it to calculate
      // tree array size. This is happens because we need to fill empty children
      // in perfect binary tree with nulls.And those nulls need extra space.
      const currentPower = Math.floor(Math.log2(inputArrayLength));
      const nextPower = currentPower + 1;
      const nextPowerOfTwoNumber = 2 ** nextPower;
      segmentTreeArrayLength = (2 * nextPowerOfTwoNumber) - 1;
    }

    return new Array(segmentTreeArrayLength).fill(null);
  }

  getLeftChildIndex(parent) {
    return (parent * 2) + 1;
  }

  getRightChildIndex(parent) {
    return (parent * 2) + 2;
  }

  buildSegmentTree() {
    this.buildSection(0, 0, this.inputArray.length - 1);
  }

  buildSection(index, inputLeft, inputRight) {
    if (inputLeft === inputRight) {
      this.segmentTree[index] = this.inputArray[inputLeft];
      return;
    }

    const halfPoint = Math.floor((inputLeft + inputRight) / 2);
    // Left Child
    this.buildSection(this.getLeftChildIndex(index), inputLeft, halfPoint);
    // Right Child
    this.buildSection(this.getRightChildIndex(index), halfPoint + 1, inputRight);

    this.segmentTree[index] = this.operation(
      this.segmentTree[this.getLeftChildIndex(index)],
      this.segmentTree[this.getRightChildIndex(index)],
    );
  }

  rangeQuery(leftQueryInput, rightQueryInput) {
    return this.recursiveSearch(0, this.inputArray.length - 1, leftQueryInput, rightQueryInput, 0);
  }

  recursiveSearch(left, right, leftQueryInput, rightQueryInput, index) {
    if (leftQueryInput <= left && rightQueryInput >= right) {
      return this.segmentTree[index];
    }

    if (leftQueryInput > right || rightQueryInput < left) {
      return this.operationFallback;
    }

    const halfPoint = Math.floor((left + right) / 2);
    // Left Child
    const leftResult = this.recursiveSearch(
      left,
      halfPoint,
      leftQueryInput,
      rightQueryInput,
      this.getLeftChildIndex(index),
    );
    // Right Child
    const rightResult = this.recursiveSearch(
      halfPoint + 1,
      right,
      leftQueryInput,
      rightQueryInput,
      this.getRightChildIndex(index),
    );

    return this.operation(leftResult, rightResult);
  }
}
