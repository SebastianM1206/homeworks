import React, { useState } from "react";
import InputCategory from "./InputCategory";

function Container() {
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);

  const addCategoria = () => {
    setCategorias([...categorias, categoria]);
    setCategoria("");
  };

  return (
    <div className="flex items-center justify-center  bg-white">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-md">
        <h1 className="text-2xl  text-gray-800 mb-4 text-center">
          Añadir nueva categoría
        </h1>
        <InputCategory
          categoria={categoria}
          setCategoria={setCategoria}
          addCategoria={addCategoria}
        />
        <ul className="space-y-2">
          {categorias.map((cate, index) => (
            <li
              key={index}
              className="p-2 bg-gray-100 rounded text-gray-700 text-center"
            >
              {cate}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Container;
