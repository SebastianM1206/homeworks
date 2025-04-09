import React from "react";
import { useClients } from "../context/ClientsContext";

const ReclamosCliente = ({ clientId }) => {
  const { clients, addReclamo, processReclamo } = useClients();
  const client = clients.find((c) => c.id === clientId);

  const handleAddReclamo = () => {
    const reclamo = prompt("Ingrese un nuevo reclamo:");
    if (reclamo) {
      addReclamo(clientId, reclamo);
    }
  };

  const handleProcessReclamo = () => {
    processReclamo(clientId);
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
        Reclamos
      </h3>
      <div className="h-48 overflow-y-auto border border-gray-300 rounded-lg p-4">
        {client.reclamos.items.length > 0 ? (
          <ul className="list-disc list-inside">
            {client.reclamos.items.map((reclamo, index) => (
              <li key={index} className="text-gray-700">
                {reclamo}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">
            No hay reclamos registrados.
          </p>
        )}
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <button
          onClick={handleAddReclamo}
          className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Agregar Reclamo
        </button>
        <button
          onClick={handleProcessReclamo}
          className={`${
            client.reclamos.isEmpty()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white font-medium px-4 py-2 rounded-md transition`}
          disabled={client.reclamos.isEmpty()}
        >
          Procesar Reclamo
        </button>
      </div>
    </div>
  );
};

export default ReclamosCliente;
