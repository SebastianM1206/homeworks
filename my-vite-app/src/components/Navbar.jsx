import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          MiApp
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/counter" className="text-white">
            Challenge 10 COUNTER
          </Link>
          <Link to="/stack" className="text-white">
            Challenge 10 STACK
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
