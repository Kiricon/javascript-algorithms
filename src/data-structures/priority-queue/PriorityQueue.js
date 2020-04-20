import MinHeap from '../heap/MinHeap';
import Comparator from '../../utils/comparator/Comparator';

export default class PriorityQueue {
  constructor() {
    this.heap = new MinHeap((a, b) => {
      if (a.priority === b.priority) {
        return 1;
      }

      return a.priority > b.priority ? 1 : -1;
    });

    this.compareByValue = new Comparator((a, b) => {
      if (a.value === b.value) {
        return 0;
      }

      return a.value < b.value ? -1 : 1;
    });
  }

  add(value, priority) {
    return this.heap.add({ value, priority });
  }

  peek() {
    return this.heap.peek().value;
  }

  poll() {
    return this.heap.poll().value;
  }

  changePriority(value, priority) {
    this.heap.remove({ value }, this.compareByValue);
    this.heap.add({ value, priority });
  }

  hasValue(value) {
    return this.heap.find({ value }, this.compareByValue).length > 0;
  }
}
