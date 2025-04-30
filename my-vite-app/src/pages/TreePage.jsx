import React from "react";
import Tree from "react-d3-tree";
import { BinaryTree } from "../utils/tree"; // Import the BinaryTree class
import { formatNode } from "../utils/format";
import { useState, useEffect, useRef } from "react";
import Functions from "../components/Functions";

const TreePage = () => {
  const [binaryTreeData, setBinaryTreeData] = useState(null); //here we are going to create a state to store the binary tree data

  const treeRef = useRef(null); // Create a reference to the tree instance

  useEffect(() => {
    const tree = new BinaryTree();
    [10, 5, 15, 3, 7, 12, 18].forEach((number) => tree.insert(number));
    treeRef.current = tree;
    const formatted = formatNode(tree.root);
    setBinaryTreeData([formatted]);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Functions treeRef={treeRef} />
      {binaryTreeData && <Tree data={binaryTreeData} orientation="vertical" />}
    </div>
  );
};

export default TreePage;
