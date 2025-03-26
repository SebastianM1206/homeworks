import React from "react";

function Button({ text, handleFunction }) {
  return (
    <div>
      <button
        onClick={() => handleFunction()}
        className="bg-blue-500 text-white px-4 py-2 m-2 cursor-pointer hover:bg-blue-700 transition-all duration-300"
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
