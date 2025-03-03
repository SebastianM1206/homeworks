import React, { useState } from "react";
import ComponentApp from "./ComponentApp";

function Container() {
  const [categories, setCategories] = useState(["React", "Vue", "Angular"]);

  //el cucho
  const handleAddCategory = (newOne) => {
    setCategories([...categories, newOne]);
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-800 text-white p-6 rounded-xl shadow-lg border border-cyan-400 max-w-md w-full">
      <h2 className="text-4xl font-semibold text-cyan-300 mb-4">
        Hola Soy el dad
      </h2>
      <ComponentApp dadFunction={handleAddCategory} dadArray={categories} />
    </div>
  );
}

export default Container;
