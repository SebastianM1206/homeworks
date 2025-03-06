import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold">
            SocialNet
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/profile" className="hover:text-gray-300 transition py-2">
              Mi Perfil
            </Link>
            <Link to="/explore" className="hover:text-gray-300 transition py-2">
              Explorar
            </Link>
            <button
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              onClick={logout}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
