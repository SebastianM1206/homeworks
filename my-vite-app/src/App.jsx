import { useState } from "react";
import "./App.css";
import FirstApp from "./components/FirstApp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-100vh  ">
      <FirstApp />
    </div>
  );
}

export default App;
