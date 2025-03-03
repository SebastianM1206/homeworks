import React from "react";
import FirstApp from "../components/FirstApp";

function Counter() {
  return (
    <div className="flex items-center justify-center ">
      <FirstApp title="CONTADOR EN CLASE " valueToStart={10} />
    </div>
  );
}

export default Counter;
