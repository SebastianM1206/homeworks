import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          CHALLENGES
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white">
            GRAPH
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
