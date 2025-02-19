import React from "react";

function Button({ text, handleFunction }) {
  return (
    <div>
      <button
        onClick={() => handleFunction()}
        className="m-3 px-6 p-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-300"
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
