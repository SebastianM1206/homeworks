class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
    this.parent = null;
  }

  addChild(value) {
    const newNode = new TreeNode(value);
    newNode.parent = this;
    this.children.push(newNode);
    return newNode;
  }

  removeChild(value) {
    this.children = this.children.filter((child) => child.value !== value);
  }

  isLeaf() {
    return this.children.length === 0;
  }

  getDepth() {
    let depth = 0;
    let current = this.parent;
    while (current !== null) {
      depth++;
      current = current.parent;
    }
    return depth;
  }
}

class GreenZoneTree {
  constructor() {
    this.root = null;
  }

  insertRoot(value) {
    if (this.root === null) {
      this.root = new TreeNode(value);
      return this.root;
    }
    return null;
  }

  insertValue(parentValue, newValue) {
    if (this.root === null) {
      return this.insertRoot(newValue);
    }

    const parentNode = this.searchNode(parentValue);
    if (parentNode) {
      return parentNode.addChild(newValue);
    }
    return null;
  }

  searchNode(value) {
    if (this.root === null) return null;

    const queue = [this.root];
    while (queue.length > 0) {
      const current = queue.shift();
      if (current.value === value) {
        return current;
      }
      queue.push(...current.children);
    }
    return null;
  }

  getMaxHeight() {
    if (this.root === null) return 0;
    return this.calculateHeight(this.root);
  }

  calculateHeight(node) {
    if (node === null || node.children.length === 0) {
      return 1;
    }

    let maxChildHeight = 0;
    for (const child of node.children) {
      const childHeight = this.calculateHeight(child);
      maxChildHeight = Math.max(maxChildHeight, childHeight);
    }

    return 1 + maxChildHeight;
  }

  getTotalNodes() {
    if (this.root === null) return 0;
    return this.countNodes(this.root);
  }

  countNodes(node) {
    if (node === null) return 0;

    let count = 1; // Count current node
    for (const child of node.children) {
      count += this.countNodes(child);
    }
    return count;
  }

  getAllNodes() {
    const nodes = [];
    if (this.root !== null) {
      this.traversePreOrder(this.root, nodes);
    }
    return nodes;
  }

  traversePreOrder(node, nodes) {
    nodes.push({
      value: node.value,
      depth: node.getDepth(),
      isLeaf: node.isLeaf(),
      parent: node.parent ? node.parent.value : null,
    });

    for (const child of node.children) {
      this.traversePreOrder(child, nodes);
    }
  }

  updateNodeValue(oldValue, newValue) {
    const node = this.searchNode(oldValue);
    if (node) {
      node.value = newValue;
      return true;
    }
    return false;
  }

  getNodeChildren(value) {
    const node = this.searchNode(value);
    if (node) {
      return node.children.map((child) => child.value);
    }
    return [];
  }
}

export { TreeNode, GreenZoneTree };
