export class Node {
  // Node class for a binary tree (just like we learned in class)
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  isLeaf() {
    if (this.left === null && this.right === null) {
      return true;
    } else {
      return false;
    }
  }
}
