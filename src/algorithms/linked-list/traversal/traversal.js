export default function traversal(list, callback) {
  let curr = list.head;
  while (curr) {
    callback(curr.value);
    curr = curr.next;
  }
}
