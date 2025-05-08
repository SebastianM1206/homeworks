import React, { useState } from "react";
import styles from "./Counter.module.scss"; // CSS Modules with SASS
import Button from "../Button/Button"; // Import the Button component

function Counter({ defaultValue }) {
  const [counter, setCounter] = useState(defaultValue);

  const handleAdd = () => {
    setCounter(counter + 1);
  };

  const handleSubstract = () => {
    setCounter(counter - 1);
  };

  const handleReset = () => {
    setCounter(defaultValue);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.counter}>Counter: {counter}</h1>
      <Button label="Increment" onClick={() => handleAdd()} />
      <Button label="Subtract" onClick={() => handleSubstract()} />
      <Button label="Reset" onClick={() => handleReset()} />
    </div>
  );
}

export default Counter;
