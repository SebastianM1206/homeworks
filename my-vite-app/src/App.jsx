import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Counter from "./pages/Counter";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </Router>
  );
}

export default App;
