import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Counter from "./pages/Counter";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Stack from "./pages/Stack";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/stack" element={<Stack />} />
      </Routes>
    </Router>
  );
}

export default App;
