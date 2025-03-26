import React from "react";
import { useState } from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "../store/slices/CounterSlice";

const FirstApp = ({ valueToStart, title = "No hay jasajsaj" }) => {
  const dispatch = useDispatch();

  const count = useSelector((state) => state.counter.value);
  const handleAdd = () => {
    dispatch(increment());
  };

  const handleSubstract = () => {
    dispatch(decrement());
  };

  const handleReset = () => {
    setCount(valueToStart);
  };

  const [amount, setAmount] = useState("");

  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(Number(amount)));
  };

  return (
    <div className="flex items-center justify-center flex-col bg-gray-100 p-10 rounded-lg shadow-md ">
      <h1 className="text-3xl">{title}</h1>
      <span className="text-2xl">{count}</span>
      <Button text="Add +1" handleFunction={handleAdd} />
      <Button text="Subtract -1" handleFunction={handleSubstract} />
      <Button text="Reset Counter" handleFunction={handleReset} />
      <div className="mt-4 flex">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded"
          placeholder="Enter amount"
        />
        <Button text="Add Amount" handleFunction={handleIncrementByAmount} />
      </div>
    </div>
  );
};

export default FirstApp;
