export default class DoublyLinkedListNode {
  constructor(value, next, previous) {
    this.value = value;
    this.previous = previous || null;
    this.next = next || null;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
