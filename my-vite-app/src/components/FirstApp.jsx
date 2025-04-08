import React from "react";
import { useEffect } from "react";
import { checkOddOrEven, checkOddOrEvenArrow } from "../utils/functions.js";

const FirstApp = () => {
  useEffect(() => {
    // Regular Function
    checkOddOrEven(5); // Output: 5 is an odd.
    checkOddOrEven(10); // Output: 10 is an even.

    // Arrow Function
    checkOddOrEvenArrow(7); // Output: 7 is an odd.
    checkOddOrEvenArrow(14); // Output: 14 is an even.
  }, []);

  return (
    <div className="container flex-col  mx-auto mt-5  max-w-2xl p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-3xl text-white">HI!</h1>
      <p className="text-2xl text-amber-50">
        Check console to know if is it odd or even.
      </p>
    </div>
  );
};

export default FirstApp;
