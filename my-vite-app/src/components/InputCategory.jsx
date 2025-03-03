import React from "react";

function InputCategory({ categoria, setCategoria, addCategoria }) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        placeholder="Ingrese la categoria a añadir"
        className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={addCategoria}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Añadir
      </button>
    </div>
  );
}

export default InputCategory;
