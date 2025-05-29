import { useState } from "react";
import { PlusIcon, MapPinIcon } from "@heroicons/react/24/outline";

function LocationForm({ onAddLocation }) {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim()) {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Micro delay for UX
      onAddLocation(name.trim());
      setName("");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <MapPinIcon className="h-5 w-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Add New Location
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="location-name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Location Name
          </label>
          <input
            id="location-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter location name..."
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder:text-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={!name.trim() || isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          ) : (
            <PlusIcon className="h-4 w-4" />
          )}
          {isSubmitting ? "Adding..." : "Add Location"}
        </button>
      </form>
    </div>
  );
}

export default LocationForm;
