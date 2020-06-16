export default function depthFirstSearch(node, callbacks) {
  const canTraverse = (child) => {
    let ans = true;

    if (callbacks && callbacks.allowTraversal) {
      ans = callbacks.allowTraversal(node, child);
    }

    return ans;
  };

  if (callbacks) callbacks.enterNode(node);
  if (node.left && canTraverse(node.left)) depthFirstSearch(node.left, callbacks);
  if (node.right && canTraverse(node.right)) depthFirstSearch(node.right, callbacks);

  if (callbacks) callbacks.leaveNode(node);
}
