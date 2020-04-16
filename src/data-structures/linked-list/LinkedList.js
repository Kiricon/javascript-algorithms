import LinkedListNode from './LinkedListNode';

export default class LinkedList {
  constructor(compareFunction) {
    this.head = null;
    this.tail = null;
    this.compareFunction = compareFunction || null;
  }

  append(value) {
    const newNode = new LinkedListNode(value);
    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }

  prepend(value) {
    const newNode = new LinkedListNode(value);
    if (this.tail == null) this.tail = newNode;
    newNode.next = this.head;
    this.head = newNode;
    return this;
  }

  delete(value) {
    let curr = this.head;
    let prev = null;

    let lastDeletedNode = null;

    while (curr != null) {
      if (curr.next === null) {
        this.tail = curr;
      }
      if (curr.value === value) {
        if (this.head === curr) {
          this.head = curr.next;
        } else if (this.tail === curr) {
          prev.next = null;
          this.tail = prev;
        } else {
          prev.next = curr.next;
        }
        lastDeletedNode = curr;
        curr = curr.next;
      } else {
        prev = curr;
        curr = curr.next;
      }
    }

    return lastDeletedNode;
  }

  deleteTail() {
    const deletedTail = this.tail;
    this.tail = null;
    let curr = this.head;
    let prev = curr;

    if (this.head === deletedTail) {
      this.head = null;
      return deletedTail;
    }


    while (curr.next) {
      prev = curr;
      curr = curr.next;
    }

    this.tail = prev;

    prev.next = null;
    return deletedTail;
  }

  deleteHead() {
    const deletedHead = this.head;

    if (this.tail === this.head) this.tail = null;
    if (this.head != null) this.head = this.head.next;

    return deletedHead;
  }

  find(params) {
    let curr = this.head;
    while (curr) {
      if (this.compareFunction) {
        if (this.compareFunction(params.value, curr.value) === 0) {
          return curr;
        }
      } else {
        if (params.value && params.value === curr.value) return curr;
        if (params.callback && params.callback(curr.value)) return curr;
      }
      curr = curr.next;
    }
    return null;
  }

  fromArray(arr) {
    arr.forEach((val) => {
      this.append(val);
    });
  }

  reverse() {
    let curr = this.head;
    let prev = null;
    let nextNode = null;

    while (curr) {
      nextNode = curr.next;

      curr.next = prev;

      prev = curr;
      curr = nextNode;
    }
    this.tail = this.head;
    this.head = prev;
  }

  toString(callback) {
    let list = '';
    let curr = this.head;

    while (curr != null) {
      list += callback ? callback(curr.value) : `${curr.value.toString()}`;
      list += `${curr.next != null ? ',' : ''}`;
      curr = curr.next;
    }

    return list;
  }
}
