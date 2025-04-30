export function formatNode(node) {
  // Convert a binary tree node to D3 format for use in the library tree
  if (!node) return null;
  const treeNode = {
    name: node.value.toString(),
  };
  const children = [];
  if (node.left) children.push(formatNode(node.left));
  if (node.right) children.push(formatNode(node.right));
  if (children.length) treeNode.children = children;
  return treeNode;
}
