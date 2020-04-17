import LinkedList from '../linked-list/LinkedList';

export default class Stack {
  constructor() {
    this.linkedList = new LinkedList();
  }

  push(val) {
    return this.linkedList.prepend(val);
  }

  pop() {
    const deleteHead = this.linkedList.deleteHead();
    return deleteHead ? deleteHead.value : null;
  }

  peek() {
    const h = this.linkedList.head;
    return h ? h.value : null;
  }

  isEmpty() {
    return this.linkedList.head === null;
  }

  toArray() {
    let curr = this.linkedList.head;
    const arr = [];
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }

    return arr;
  }

  toString(callback) {
    return this.linkedList.toString(callback);
  }
}
