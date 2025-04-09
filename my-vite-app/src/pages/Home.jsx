import React, { useState } from "react";
import { useClients } from "../context/ClientsContext";

function Home() {
  const { addClient, clients } = useClients();
  const [name, setName] = useState("");

  const handleAddClient = () => {
    if (name.trim() !== "") {
      const id = clients.length + 1;
      addClient(id, name);
      setName("");
    } else {
      alert("Por favor, ingresa un nombre válido.");
    }
  };

  return (
    <div className="min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mt-10">
        Bienvenido al centro de atención al cliente
      </h1>
      <p className="text-center mt-4">
        Aquí podrás hacer consultas o poner tus reclamos, si aún no está tu
        nombre en nuestra base de datos ¡regístrate!
      </p>
      <div className="mt-6 flex items-center justify-center">
        <input
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="text"
          placeholder="Ingresa tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="ml-4 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleAddClient}
        >
          Registrar
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center">
          Clientes registrados:
        </h2>
        <ul className="mt-4 list-disc list-inside">
          {clients.map((client) => (
            <li key={client.id} className="text-center">
              {client.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
