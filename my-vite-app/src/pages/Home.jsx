import React from "react";
import Counter from "../components/counter/Counter";

function Home() {
  return (
    <div>
      <Counter defaultValue={0}></Counter>
    </div>
  );
}

export default Home;
