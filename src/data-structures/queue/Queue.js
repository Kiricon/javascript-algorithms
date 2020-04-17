import LinkedList from '../linked-list/LinkedList';

export default class Queue {
  constructor() {
    this.linkedList = new LinkedList();
  }

  enqueue(val) {
    return this.linkedList.append(val);
  }

  dequeue() {
    const deleteHead = this.linkedList.deleteHead();
    return deleteHead ? deleteHead.value : null;
  }

  peek() {
    return this.linkedList.tail ? this.linkedList.head.value : null;
  }

  isEmpty() {
    return this.linkedList.head == null;
  }

  toString(callback) {
    return this.linkedList.toString(callback);
  }
}
