import React, { useState } from "react";
import { useClients } from "../context/ClientsContext";
import ConsultasCliente from "../components/ConsultasCliente";
import ReclamosCliente from "../components/ReclamosCliente";

function AllClients() {
  const { clients } = useClients();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < clients.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (clients.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold">No hay clientes registrados aún</h1>
      </div>
    );
  }

  const currentClient = clients[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mt-10">
        Información de Clientes
      </h1>
      <p className="text-center mt-4">
        Navega a través de los clientes registrados para ver sus consultas y
        reclamos.
      </p>
      <div className="mt-6 w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Cliente {currentIndex + 1} de {clients.length}
        </h2>
        <p className="text-lg">
          <strong>Nombre:</strong> {currentClient.name}
        </p>
        <div className="mt-6 flex flex-col md:flex-row gap-6 justify-between">
          <div className="w-full md:w-1/2">
            <p className="text-lg font-medium mb-2">
              <strong>Consultas en cola:</strong>{" "}
              {currentClient.consultas.size()}
            </p>
            <ConsultasCliente clientId={currentClient.id} />
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-lg font-medium mb-2">
              <strong>Reclamos en pila:</strong> {currentClient.reclamos.size()}
            </p>
            <ReclamosCliente clientId={currentClient.id} />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Anterior
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleNext}
            disabled={currentIndex === clients.length - 1}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllClients;
