import React, { useState } from "react";
import { useCityNetwork } from "../context/CityNetworkContext.jsx";
import CityCard from "./CityCard.jsx";
import AddCityForm from "./AddCityForm.jsx";
import NetworkGraph from "./NetworkGraph.jsx";

const NetworkView = () => {
  const {
    cityNetwork,
    addCity,
    removeCity,
    addConnection,
    selectCity,
    selectedCity,
  } = useCityNetwork();

  const [showAddForm, setShowAddForm] = useState(false);
  const [showConnectionForm, setShowConnectionForm] = useState(false);
  const [connectionData, setConnectionData] = useState({
    city1: "",
    city2: "",
  });

  const cities = cityNetwork.nodes || [];

  const handleAddConnection = () => {
    if (
      connectionData.city1 &&
      connectionData.city2 &&
      connectionData.city1 !== connectionData.city2
    ) {
      addConnection(connectionData.city1, connectionData.city2);
      setConnectionData({ city1: "", city2: "" });
      setShowConnectionForm(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header y controles */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Red de Ciudades</h2>

        <div className="flex gap-3">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            + Agregar Ciudad
          </button>

          {cities.length >= 2 && (
            <button
              onClick={() => setShowConnectionForm(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Conectar Ciudades
            </button>
          )}
        </div>
      </div>

      {/* Gráfico de red */}
      {cities.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Visualización de la Red
          </h3>
          <NetworkGraph />
        </div>
      )}

      {/* Lista de ciudades */}
      {cities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <CityCard
              key={city}
              cityName={city}
              connections={cityNetwork.getConnections(city)}
              isSelected={selectedCity === city}
              onSelect={() => selectCity(city)}
              onRemove={() => removeCity(city)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-4xl mb-4 text-gray-400">●</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No hay ciudades en la red
          </h3>
          <p className="text-gray-500 mb-6">
            Comienza agregando tu primera ciudad para crear la red
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            + Agregar Primera Ciudad
          </button>
        </div>
      )}

      {/* Modal para agregar ciudad */}
      {showAddForm && (
        <AddCityForm
          onSubmit={(name) => {
            addCity(name);
            setShowAddForm(false);
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Modal para conectar ciudades */}
      {showConnectionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Conectar Ciudades
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primera Ciudad
                </label>
                <select
                  value={connectionData.city1}
                  onChange={(e) =>
                    setConnectionData((prev) => ({
                      ...prev,
                      city1: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Selecciona una ciudad</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Segunda Ciudad
                </label>
                <select
                  value={connectionData.city2}
                  onChange={(e) =>
                    setConnectionData((prev) => ({
                      ...prev,
                      city2: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Selecciona una ciudad</option>
                  {cities
                    .filter((city) => city !== connectionData.city1)
                    .map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddConnection}
                disabled={!connectionData.city1 || !connectionData.city2}
                className="flex-1 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200"
              >
                Conectar
              </button>
              <button
                onClick={() => {
                  setShowConnectionForm(false);
                  setConnectionData({ city1: "", city2: "" });
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all duration-200"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkView;
