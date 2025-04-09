import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FormPage from "./pages/FormPage";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AllClients from "./pages/AllClients";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allClients" element={<AllClients />} />
      </Routes>
    </Router>
  );
}

export default App;
