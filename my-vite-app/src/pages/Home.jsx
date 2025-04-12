import React from "react";
import { useDispatch } from "react-redux";
import { startLogout } from "../store/slices/auth/thunks";
import { useNavigate } from "react-router-dom";
import Crud from "../components/Crud";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
    navigate("/login");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="bg-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-700">
          Bienvenido a la HomePage
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 p-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          ¡Explora la aplicación! (es un crud jajsjas)
        </h2>
        <Crud />
        {/* Aquí puedes agregar más componentes o contenido dinámico */}
      </div>
    </div>
  );
}

export default Home;
