export default function reverseTraversal(list, callback) {
  const printNext = (node) => {
    if (node.next) printNext(node.next);
    callback(node.value);
  };

  printNext(list.head);
}
