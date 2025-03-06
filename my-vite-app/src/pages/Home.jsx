import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Bienvenido a CaraLibro
        </h1>
        <p className="text-lg text-gray-600">
          Conéctate con amigos, comparte momentos y descubre contenido
          increíble.
        </p>
        <p className="mt-2 text-gray-500">
          Inicia sesión para ver más contenido.
        </p>

        <Button text="Iniciar Sesión" handleFunction={handleNavigate}></Button>
      </div>
    </div>
  );
};

export default Home;
