export default function bfs(root, callbacks) {
  const allowMethodExists = callbacks && callbacks.allowTraversal;
  const allowTraversal = allowMethodExists
    ? callbacks.allowTraversal : (node, child) => !!node && !!child;
  const queue = [];
  queue.push(root);

  while (queue.length) {
    const node = queue.shift();

    if (callbacks) callbacks.enterNode(node);

    if (node.left && allowTraversal(node, node.left)) queue.push(node.left);
    if (node.right && allowTraversal(node, node.right)) queue.push(node.right);

    if (callbacks) callbacks.leaveNode(node);
  }
}
