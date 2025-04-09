import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          CENTRO DE ATENCION AL CLIENTE
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white">
            Clientes
          </Link>
          <Link to="/allClients" className="text-white">
            VerTodo
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
