import { useState } from "react";

import { useClients } from "../context/ClientsContext";

export default function FormPage() {
  const { addClient, clients } = useClients();
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    consulta: "",
    reclamo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const solicitud = {
      nombre: formData.nombre,
      ...(formData.consulta && { consulta: formData.consulta }),
      ...(formData.reclamo && { reclamo: formData.reclamo }),
      fecha: new Date().toISOString(),
    };

    console.log("Solicitud enviada:", solicitud);
    alert("Tu solicitud fue enviada con éxito.");

    setFormData({
      nombre: "",
      correo: "",
      consulta: "",
      reclamo: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Consultas y Reclamos
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre completo
              </label>
              <input
                id="nombre"
                name="nombre"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="consulta"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Consulta (opcional)
              </label>
              <textarea
                id="consulta"
                name="consulta"
                rows={3}
                placeholder="Escribe tu consulta aquí..."
                value={formData.consulta}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="reclamo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Reclamo (opcional)
              </label>
              <textarea
                id="reclamo"
                name="reclamo"
                rows={3}
                placeholder="Escribe tu reclamo aquí..."
                value={formData.reclamo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
