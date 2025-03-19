import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Rutas normales (solo pa cuando no se está loggeado) */}

        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
