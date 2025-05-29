import { useState } from "react";
import {
  EyeIcon,
  TrashIcon,
  LinkIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

function LocationList({
  locations,
  onSelectLocation,
  onRemoveLocation,
  onConnectLocations,
}) {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleLocationClick = (location) => {
    onSelectLocation(location);
  };

  const handleConnectClick = async () => {
    if (selectedLocations.length === 2) {
      setIsConnecting(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      onConnectLocations(selectedLocations[0].id, selectedLocations[1].id);
      setSelectedLocations([]);
      setIsConnecting(false);
    }
  };

  const toggleLocationSelection = (location) => {
    if (selectedLocations.some((l) => l.id === location.id)) {
      setSelectedLocations(
        selectedLocations.filter((l) => l.id !== location.id)
      );
    } else if (selectedLocations.length < 2) {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  const isLocationSelected = (location) => {
    return selectedLocations.some((l) => l.id === location.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <MapPinIcon className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Locations</h3>
            <p className="text-sm text-gray-500">
              {locations.length} location{locations.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {selectedLocations.length === 2 && (
          <button
            onClick={handleConnectClick}
            disabled={isConnecting}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-all"
          >
            {isConnecting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            ) : (
              <LinkIcon className="h-4 w-4" />
            )}
            {isConnecting ? "Connecting..." : "Connect"}
          </button>
        )}
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {locations.length === 0 ? (
          <div className="text-center py-8">
            <MapPinIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No locations yet</p>
            <p className="text-sm text-gray-400">
              Add your first location to get started
            </p>
          </div>
        ) : (
          locations.map((location) => (
            <div key={location.id} className="group relative">
              <div
                className={`p-4 rounded-lg border-2 transition-all ${
                  isLocationSelected(location)
                    ? "border-indigo-300 bg-indigo-50"
                    : "border-gray-100 hover:border-gray-200 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-gray-900 truncate">
                      {location.name}
                    </h4>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Connections:</span>{" "}
                        {location.connections.length === 0 ? (
                          <span className="text-gray-400">None</span>
                        ) : (
                          <span className="text-blue-600">
                            {location.getConnectionNames().join(", ")}
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">
                          Environmental Zones:
                        </span>{" "}
                        {location.environmentalZones.length}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleLocationClick(location)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View details"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => toggleLocationSelection(location)}
                      className={`p-2 rounded-lg transition-colors ${
                        isLocationSelected(location)
                          ? "text-indigo-600 bg-indigo-50"
                          : "text-gray-400 hover:text-indigo-600 hover:bg-indigo-50"
                      }`}
                      title={
                        isLocationSelected(location)
                          ? "Deselect"
                          : "Select for connection"
                      }
                      disabled={
                        !isLocationSelected(location) &&
                        selectedLocations.length >= 2
                      }
                    >
                      {isLocationSelected(location) ? (
                        <CheckCircleIcon className="h-4 w-4" />
                      ) : (
                        <XCircleIcon className="h-4 w-4" />
                      )}
                    </button>

                    <button
                      onClick={() => onRemoveLocation(location.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete location"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedLocations.length > 0 && (
        <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
          <p className="text-sm text-indigo-700">
            <span className="font-medium">Selected for connection:</span>{" "}
            {selectedLocations.map((l) => l.name).join(" ↔ ")}
            {selectedLocations.length === 1 && (
              <span className="text-indigo-500"> (select one more)</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default LocationList;
