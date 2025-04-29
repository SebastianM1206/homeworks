import React from "react";
import TreeNode from "../components/TreeNode";
import BinaryTree from "../components/BinaryTree";
import { arbol } from "../utils/data";

function Home() {
  return (
    <div className=" ">
      <BinaryTree initialRoot={arbol} />
    </div>
  );
}

export default Home;
