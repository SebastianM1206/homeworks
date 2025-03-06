import React, { memo } from "react";

const Son = memo(({ numero, increment }) => {
  console.log("again reloaded...");

  return (
    <button
      className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-blue-700 active:scale-95"
      onClick={() => increment(numero)}
    >
      {numero}
    </button>
  );
});

export default Son;
