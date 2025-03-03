import React from "react";
import { useState } from "react";
import Button from "./Button";

const ComponentApp = ({ dadFunction, dadArray }) => {
  const [category, setCategory] = useState("");

  const handleUseDadFunction = () => {
    if (category.trim() !== "") {
      dadFunction(category);
      setCategory("");
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg border border-cyan-400 max-w-md w-full">
      <h2 className="text-2xl font-semibold text-cyan-300 mb-4">
        Soy el Son 🚀
      </h2>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Ingrese la categoría"
        className="w-full p-3 rounded-lg bg-gray-900 border border-cyan-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-lg"
      />
      <Button text="Agregar" handleFunction={handleUseDadFunction} />
      <h2 className="text-xl font-semibold text-cyan-300 mt-4">Categories</h2>
      <ul className="mt-2 space-y-2">
        {dadArray.map((item, index) => (
          <li
            key={index}
            className="bg-gray-700 p-2 rounded-lg shadow-md text-cyan-200"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComponentApp;
