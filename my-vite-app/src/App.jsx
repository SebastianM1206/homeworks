import { useState } from "react";
import "./App.css";
import FirstApp from "./components/FirstApp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center justify-center h-screen">
      <FirstApp title="CONTADOR EN CLASE " valueToStart={10} />
    </div>
  );
}

export default App;
