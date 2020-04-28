export default class DisjointSetItem {
  constructor(value, keyExtractor) {
    this.value = value;
    this.parent = null;
    this.children = {};
    this.keyExtractor = keyExtractor;
    this.rank = 0;
  }

  getKey() {
    return this.keyExtractor ? this.keyExtractor(this.value) : this.value;
  }

  getChildren() {
    return Object.values(this.children);
  }

  getRoot() {
    return this.parent ? this.parent.getRoot() : this;
  }

  getRank() {
    const children = Object.values(this.children);
    if (children.length === 0) return 0;

    let rank = 0;

    children.forEach((c) => {
      rank += c.getRank();
      rank += 1;
    });

    return rank;
  }

  isRoot() {
    return this === this.getRoot();
  }

  static JoinItems(parent, child) {
    // eslint-disable-next-line no-param-reassign
    parent.children[child.getKey()] = child;
    // eslint-disable-next-line no-param-reassign
    child.parent = parent;
  }

  addChild(item) {
    DisjointSetItem.JoinItems(this, item);
  }

  setParent(item) {
    DisjointSetItem.JoinItems(item, this);
  }
}
