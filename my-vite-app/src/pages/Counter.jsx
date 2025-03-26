import React from "react";
import FirstApp from "../components/FirstApp";

function Counter() {
  return (
    <div className="flex items-center justify-center ">
      <FirstApp title="CONTADOR CON REDUX mi papa" valueToStart={10} />
    </div>
  );
}

export default Counter;
