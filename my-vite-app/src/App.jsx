import { useState } from "react";
import Location from "./models/Location";
import EnvironmentalZone from "./models/EnvironmentalZone";
import LocationForm from "./components/LocationForm";
import LocationList from "./components/LocationList";
import EnvironmentalZoneForm from "./components/EnvironmentalZoneForm";
import LocationNetwork from "./components/LocationNetwork";
import EnvironmentalZoneTree from "./components/EnvironmentalZoneTree";
import { GlobeAltIcon, SparklesIcon } from "@heroicons/react/24/outline";

function App() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const addLocation = (name) => {
    const newLocation = new Location(name);
    setLocations([...locations, newLocation]);
  };

  const removeLocation = (locationId) => {
    const locationToRemove = locations.find(
      (location) => location.id === locationId
    );
    if (locationToRemove) {
      // Remove connections to this location
      locations.forEach((location) => {
        location.removeConnection(locationToRemove);
      });
      setLocations(locations.filter((location) => location.id !== locationId));
      if (selectedLocation && selectedLocation.id === locationId) {
        setSelectedLocation(null);
      }
    }
  };

  const addEnvironmentalZone = (locationId, zoneName) => {
    const location = locations.find((l) => l.id === locationId);
    if (location) {
      const newZone = new EnvironmentalZone(zoneName, 1);
      location.addEnvironmentalZone(newZone);
      setLocations([...locations]);
      if (selectedLocation && selectedLocation.id === locationId) {
        setSelectedLocation(location);
      }
    }
  };

  const addSubzone = (locationId, parentZoneId, zoneName) => {
    const location = locations.find((l) => l.id === locationId);
    if (location) {
      const findZone = (zones, id) => {
        for (let zone of zones) {
          if (zone.id === id) return zone;
          const subzone = findZone(zone.subzones, id);
          if (subzone) return subzone;
        }
        return null;
      };

      const parentZone = findZone(location.environmentalZones, parentZoneId);
      if (parentZone) {
        const newSubzone = new EnvironmentalZone(zoneName);
        parentZone.addSubzone(newSubzone);
        setLocations([...locations]);

        if (selectedLocation && selectedLocation.id === locationId) {
          setSelectedLocation(location);
        }
      }
    }
  };

  const connectLocations = (locationId1, locationId2) => {
    const location1 = locations.find((l) => l.id === locationId1);
    const location2 = locations.find((l) => l.id === locationId2);
    if (location1 && location2) {
      location1.addConnection(location2);
      setLocations([...locations]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl">
              <GlobeAltIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Environmental Location Network
              </h1>
              <p className="text-sm text-gray-600">
                Midterm 3 looking for the five my dad
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1 space-y-6">
            <LocationForm onAddLocation={addLocation} />
            <LocationList
              locations={locations}
              onSelectLocation={setSelectedLocation}
              onRemoveLocation={removeLocation}
              onConnectLocations={connectLocations}
            />
          </div>

          <div className="xl:col-span-1">
            <LocationNetwork locations={locations} />
          </div>

          <div className="xl:col-span-1 space-y-6">
            {selectedLocation ? (
              <>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-lg">
                      <SparklesIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {selectedLocation.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Environmental zones management
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-emerald-50 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-emerald-600">
                        {selectedLocation.getMaxDepth()}
                      </p>
                      <p className="text-xs text-emerald-700 font-medium">
                        Max Depth
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {selectedLocation.getEnvironmentalZoneCount()}
                      </p>
                      <p className="text-xs text-blue-700 font-medium">
                        Total Zones
                      </p>
                    </div>
                  </div>
                </div>

                <EnvironmentalZoneForm
                  locationId={selectedLocation.id}
                  onAddEnvironmentalZone={addEnvironmentalZone}
                  onAddSubzone={addSubzone}
                  zones={selectedLocation.environmentalZones}
                />
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <SparklesIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Location Selected
                </h3>
                <p className="text-gray-500">
                  Select a location from the list to manage its environmental
                  zones
                </p>
              </div>
            )}
          </div>
        </div>

        {selectedLocation && selectedLocation.environmentalZones.length > 0 && (
          <div className="mt-8">
            <EnvironmentalZoneTree
              zones={selectedLocation.environmentalZones}
            />
          </div>
        )}
      </div>

      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              Environmental Location Network • midterm 3 looking for the five
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
