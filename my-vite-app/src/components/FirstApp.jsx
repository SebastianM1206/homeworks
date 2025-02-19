import React from "react";
import { useState } from "react";
import Button from "./Button";

const FirstApp = ({ valueToStart, title = "No hay jasajsaj" }) => {
  const [count, setCount] = useState(valueToStart);

  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleSubstract = () => {
    setCount(count - 1);
  };

  const handleReset = () => {
    setCount(valueToStart);
  };

  return (
    <div className="flex items-center justify-center flex-col bg-gray-100 p-10 rounded-lg shadow-md ">
      <h1 className="text-3xl">{title}</h1>
      <span className="text-2xl">{count}</span>
      <Button text="Add +1" handleFunction={handleAdd} />
      <Button text="Subtract -1" handleFunction={handleSubstract} />
      <Button text="Reset Counter" handleFunction={handleReset} />
    </div>
  );
};

export default FirstApp;
