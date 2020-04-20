import TrieNode from './TrieNode';

export default class Trie {
  constructor() {
    this.head = new TrieNode('*');
  }

  addWord(word) {
    let curr = this.head;
    for (let i = 0; i < word.length; i += 1) {
      if (curr.hasChild(word[i])) {
        curr = curr.getChild(word[i]);
        if (i === word.length - 1) curr.isCompleteWord = true;
      } else {
        const newNode = curr.addChild(word[i], i === word.length - 1);
        curr = newNode;
      }
    }
  }

  doesWordExist(word) {
    let curr = this.head;
    for (let i = 0; i < word.length; i += 1) {
      if (curr.hasChild(word[i])) {
        curr = curr.getChild(word[i]);
        if (curr.isCompleteWord && i === word.length - 1) {
          return true;
        }
      } else {
        return false;
      }
    }

    return false;
  }

  deleteWord(word) {
    const deepDelete = (node, charIndex) => {
      if (charIndex >= word.length) return;
      const child = node.getChild(word[charIndex]);
      if (!child) return;

      deepDelete(child, charIndex + 1);

      if (charIndex === word.length - 1) {
        child.isCompleteWord = false;
      }

      node.removeChild(word[charIndex]);
    };

    deepDelete(this.head, 0);
    return this;
  }

  suggestNextCharacters(word) {
    let curr = this.head;
    for (let i = 0; i < word.length; i += 1) {
      if (!curr.hasChild(word[i])) return null;

      if (i === word.length - 1) {
        return curr.getChild(word[i]).suggestChildren();
      }

      curr = curr.getChild(word[i]);
    }

    return null;
  }
}
