/* eslint-disable react/prop-types */
import { useState } from "react";
import { PlusIcon, MapIcon } from "@heroicons/react/24/outline";

function EnvironmentalZoneForm({
  locationId,
  onAddEnvironmentalZone,
  onAddSubzone,
  zones,
}) {
  const [name, setName] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim()) {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 200)); // UX delay

      if (selectedZone) {
        onAddSubzone(locationId, selectedZone, name.trim());
      } else {
        onAddEnvironmentalZone(locationId, name.trim());
      }

      setName("");
      setSelectedZone("");
      setIsSubmitting(false);
    }
  };

  const getAllZoneOptions = () => {
    const options = [];
    zones.forEach((zone) => {
      options.push(
        <option key={zone.id} value={zone.id}>
          {zone.name} (Level {zone.level})
        </option>
      );
      const addSubzones = (subzones, level = 1) => {
        subzones.forEach((subzone) => {
          options.push(
            <option key={subzone.id} value={subzone.id}>
              {"  ".repeat(level) + "└─ "} {subzone.name} (Level {subzone.level}
              )
            </option>
          );
          if (subzone.subzones.length > 0) {
            addSubzones(subzone.subzones, level + 1);
          }
        });
      };
      if (zone.subzones.length > 0) {
        addSubzones(zone.subzones);
      }
    });
    return options;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-emerald-50 rounded-lg">
          <MapIcon className="h-5 w-5 text-emerald-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Add Environmental Zone
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="zone-name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Zone Name
          </label>
          <input
            id="zone-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Central Park..."
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors placeholder:text-gray-400"
          />
        </div>

        <div>
          <label
            htmlFor="parent-zone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Parent Zone (optional)
          </label>
          <select
            id="parent-zone"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors bg-white"
          >
            <option value="">Create as main zone (Level 1)</option>
            {getAllZoneOptions()}
          </select>
          <p className="mt-1 text-xs text-gray-500">
            {selectedZone
              ? `Will be created as a subzone at the next level`
              : "Will be created as a main environmental zone at Level 1"}
          </p>
        </div>

        <button
          type="submit"
          disabled={!name.trim() || isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          ) : (
            <PlusIcon className="h-4 w-4" />
          )}
          {isSubmitting
            ? "Adding..."
            : selectedZone
            ? "Add Subzone"
            : "Add Zone"}
        </button>
      </form>
    </div>
  );
}

export default EnvironmentalZoneForm;
