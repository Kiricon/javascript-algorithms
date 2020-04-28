export default class BloomFilter {
  constructor(size = 100) {
    this.size = size;
    this.store = this.createStore(size);
  }

  createStore(size) {
    const storage = new Array(size).fill(false);

    const storageInterface = {
      getValue(index) {
        return storage[index];
      },
      setValue(index) {
        storage[index] = true;
      },
    };

    return storageInterface;
  }

  getHashValues(value) {
    return [
      this.hash1(value),
      this.hash2(value),
      this.hash3(value),
    ];
  }

  mayContain(value) {
    const indices = this.getHashValues(value);
    for (let i = 0; i < indices.length; i += 1) {
      if (!this.store.getValue(indices[i])) return false;
    }
    return true;
  }

  insert(value) {
    const indices = this.getHashValues(value);
    indices.forEach(i => this.store.setValue(i));
    return this;
  }

  hash1(item) {
    let hash = 0;

    for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
      const char = item.charCodeAt(charIndex);
      hash = (hash << 5) + hash + char;
      hash &= hash; // Convert to 32bit integer
      hash = Math.abs(hash);
    }

    return hash % this.size;
  }

  /**
   * @param {string} item
   * @return {number}
   */
  hash2(item) {
    let hash = 5381;

    for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
      const char = item.charCodeAt(charIndex);
      hash = (hash << 5) + hash + char; /* hash * 33 + c */
    }

    return Math.abs(hash % this.size);
  }

  /**
   * @param {string} item
   * @return {number}
   */
  hash3(item) {
    let hash = 0;

    for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
      const char = item.charCodeAt(charIndex);
      hash = (hash << 5) - hash;
      hash += char;
      hash &= hash; // Convert to 32bit integer
    }

    return Math.abs(hash % this.size);
  }
}
