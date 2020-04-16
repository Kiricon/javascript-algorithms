import DoublyLinkedListNode from './DoublyLinkedListNode';

export default class DoublyLinkedList {
  constructor(comparatorFunction) {
    this.head = null;
    this.tail = null;
    this.comparatorFunction = comparatorFunction;
  }

  append(value) {
    const newNode = new DoublyLinkedListNode(value);

    // First append
    if (!this.head) {
      this.head = newNode;
      return this;
    }

    // Loop through and append
    let curr = this.head;
    while (curr.next) {
      curr = curr.next;
    }
    newNode.previous = curr;
    curr.next = newNode;
    this.tail = newNode;
    // Return appended node
    return this;
  }

  prepend(value) {
    const newNode = new DoublyLinkedListNode(value, this.head);
    if (!this.tail) this.tail = newNode;
    if (this.head) this.head.previous = newNode;

    this.head = newNode;
    return this;
  }

  fromArray(arr) {
    let previous = null;
    arr.forEach((value) => {
      const newNode = new DoublyLinkedListNode(value);
      newNode.previous = previous;
      if (previous) previous.next = newNode;

      previous = newNode;
      if (!this.head) this.head = newNode;
    });

    this.tail = previous;
  }

  delete(value) {
    let curr = this.head;
    let lastDeletedNode = null;

    while (curr) {
      if (curr.value === value) {
        lastDeletedNode = curr;
        if (curr.previous && curr !== this.head) {
          curr.previous.next = curr.next;
          if (curr.next) curr.next.previous = curr.previous;
          this.tail = curr.previous;
        } else {
          this.head = curr.next;
          curr.previous = null;
          this.tail = this.head;
        }
      } else {
        this.tail = curr;
      }

      curr = curr.next;
    }


    return lastDeletedNode;
  }

  deleteTail() {
    const oldTail = this.tail;

    if (this.tail === this.head) {
      this.head = null;
      this.tail = null;
      return oldTail;
    }

    if (this.tail) {
      this.tail = this.tail.previous;
      if (this.tail) this.tail.next = null;
    }

    return oldTail;
  }

  deleteHead() {
    const oldHead = this.head;
    if (!this.head) return null;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return oldHead;
    }

    if (this.head.next) {
      this.head.next.previous = null;
      this.head = this.head.next;
    } else {
      this.head = null;
    }


    return oldHead;
  }

  find(params) {
    let curr = this.head;
    while (curr) {
      if (this.comparatorFunction
        && this.comparatorFunction(params.value, curr.value) === 0) return curr;
      if (params.callback && params.callback(curr.value)) return curr;
      if (curr.value === params.value) return curr;
      curr = curr.next;
    }

    return null;
  }

  reverse() {
    let curr = this.head;
    let prevNode = null;
    let nextNode = null;

    while (curr) {
      nextNode = curr.next;
      prevNode = curr.previous;

      curr.next = prevNode;
      curr.previous = nextNode;

      prevNode = curr;
      curr = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }

  toString(callback) {
    let string = '';
    let curr = this.head;
    while (curr) {
      string += callback ? callback(curr.value) : curr.value;
      if (curr.next) string += ',';
      curr = curr.next;
    }

    return string;
  }
}
