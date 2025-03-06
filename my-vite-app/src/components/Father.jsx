import React, { useState, useCallback } from "react";
import Son from "./Son";

const Father = () => {
  const list = [2, 4, 6, 8, 10];
  const [valor, setValor] = useState(0);

  const increment = useCallback((num) => {
    setValor((prev) => prev + num);
  }, []);

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800">Soy el Father</h1>
        <p className="text-xl text-gray-700 mt-4">
          Total: <span className="font-semibold text-blue-600">{valor}</span>
        </p>
        <hr className="my-4 border-gray-300" />
        <div className="flex flex-wrap justify-center gap-3">
          {list.map((n, idx) => (
            <Son key={idx} numero={n} increment={increment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Father;
