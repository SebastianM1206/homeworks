import React from "react";
import { useClients } from "../context/ClientsContext";

const ConsultasCliente = ({ clientId }) => {
  const { clients, addConsulta, processConsulta } = useClients();
  const client = clients.find((c) => c.id === clientId);

  const handleAddConsulta = () => {
    const consulta = prompt("Ingrese una nueva consulta:");
    if (consulta) {
      addConsulta(clientId, consulta);
    }
  };

  const handleProcessConsulta = () => {
    processConsulta(clientId);
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
        consultas
      </h3>
      <div className="h-48 overflow-y-auto border border-gray-300 rounded-lg p-4">
        {client.consultas.items.length > 0 ? (
          <ul className="list-disc list-inside">
            {client.consultas.items.map((consulta, index) => (
              <li key={index} className="text-gray-700">
                {consulta}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">
            No hay consultas registradas.
          </p>
        )}
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <button
          onClick={handleAddConsulta}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition"
        >
          Agregar Consulta
        </button>
        <button
          onClick={handleProcessConsulta}
          className={`${
            client.consultas.isEmpty()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white font-medium px-4 py-2 rounded-md transition`}
          disabled={client.consultas.isEmpty()}
        >
          Procesar Consulta
        </button>
      </div>
    </div>
  );
};

export default ConsultasCliente;
