import { useCityNetwork } from "../context/CityNetworkContext.jsx";

const CityCard = ({
  cityName,
  connections,
  isSelected,
  onSelect,
  onRemove,
}) => {
  const { getCityGreenZoneStats } = useCityNetwork();
  const stats = getCityGreenZoneStats(cityName);

  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all duration-200 cursor-pointer ${
        isSelected
          ? "border-blue-500 shadow-xl scale-105"
          : "border-gray-200 hover:border-blue-300 hover:shadow-xl"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          {cityName}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
          title="Eliminar ciudad"
        >
          Eliminar
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Conexiones:</span>
          <span className="font-bold text-purple-600">
            {connections.length}
          </span>
        </div>

        {connections.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs font-medium text-gray-600 mb-2">
              Conectada con:
            </p>
            <div className="flex flex-wrap gap-1">
              {connections.map((connection) => (
                <span
                  key={connection}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {connection}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {stats.maxHeight}
            </p>
            <p className="text-xs text-gray-600">Altura Máxima</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {stats.totalZones}
            </p>
            <p className="text-xs text-gray-600">Zonas Verdes</p>
          </div>
        </div>
      </div>

      {isSelected && (
        <div className="mt-4 pt-3 border-t border-blue-200">
          <p className="text-xs text-blue-600 font-medium text-center">
            Ciudad seleccionada - Ve a Zonas Verdes para gestionar
          </p>
        </div>
      )}
    </div>
  );
};

export default CityCard;
