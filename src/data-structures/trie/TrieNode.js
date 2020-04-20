import HashTable from '../hash-table/HashTable';

export default class TrieNode {
  constructor(character, isCompleteWord) {
    this.character = character;
    this.isCompleteWord = isCompleteWord || false;
    this.children = new HashTable();
  }

  addChild(character, isCompleteWord) {
    const newNode = new TrieNode(character, isCompleteWord);
    this.children.set(character, newNode);
    return newNode;
  }

  getChild(character) {
    return this.children.get(character);
  }

  hasChild(character) {
    return !!this.children.has(character);
  }

  hasChildren() {
    return this.children.getKeys().length > 0;
  }

  removeChild(character) {
    const child = this.children.get(character);
    if (!!child && child.isCompleteWord === false && child.hasChildren() === false) {
      return this.children.delete(character);
    }

    return null;
  }

  suggestChildren() {
    return this.children.getKeys();
  }

  toString() {
    const childrenKeys = this.children.getKeys();
    const childrenText = childrenKeys.length > 0 ? `:${childrenKeys.join(',')}` : `${this.isCompleteWord ? '*' : ''}`;
    return `${this.character}${childrenText}`;
  }
}
