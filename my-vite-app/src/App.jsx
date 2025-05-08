import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ExamplePage from "./pages/ExamplePage";
import Navbar from "./components/navbar/Navbar";
import ExamplePageTwo from "./pages/ExamplePageTwo";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/example1" element={<ExamplePage></ExamplePage>} />
        <Route path="/example2" element={<ExamplePageTwo></ExamplePageTwo>} />
      </Routes>
    </Router>
  );
}

export default App;
