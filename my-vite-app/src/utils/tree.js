import { Node } from "./node.js";

export class BinaryTree {
  constructor() {
    this.root = null;
  }
  //insert method to add a new node to the tree (just like we learned in class)
  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }
  //here we are going to create methods to traverse the tree in different ways (inorder, preorder, postorder)
  inorder(node = this.root, result = []) {
    if (!node) return result;
    this.inorder(node.left, result);
    result.push(node.value);
    this.inorder(node.right, result);
    return result;
  }

  preorder(node = this.root, result = []) {
    if (!node) return result;
    result.push(node.value);
    this.preorder(node.left, result);
    this.preorder(node.right, result);
    return result;
  }

  postorder(node = this.root, result = []) {
    if (!node) return result;
    this.postorder(node.left, result);
    this.postorder(node.right, result);
    result.push(node.value);
    return result;
  }

  contains(value) {
    let current = this.root;

    while (current) {
      if (current.value === value) {
        return true; // if we find the value, return true
      }

      // if the value is less than the current node's value, go left
      // if the value is greater than the current node's value, go right
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    // if we get to this point, the value was not found in the tree
    return false;
  }
}
