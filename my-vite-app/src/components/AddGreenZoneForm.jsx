import { useState } from "react";

const AddGreenZoneForm = ({ cityName, parentZoneId, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "parque",
    area: "",
    description: "",
  });
  const [error, setError] = useState("");

  const zoneTypes = [
    {
      value: "central",
      label: "Central",
      description: "Zona central principal",
    },
    { value: "parque", label: "Parque", description: "Parque público" },
    { value: "jardin", label: "Jardín", description: "Jardín ornamental" },
    { value: "bosque", label: "Bosque", description: "Área boscosa" },
    { value: "plaza", label: "Plaza", description: "Plaza con zonas verdes" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("El nombre de la zona es requerido");
      return;
    }

    if (formData.name.trim().length < 2) {
      setError("El nombre debe tener al menos 2 caracteres");
      return;
    }

    const area = formData.area ? parseFloat(formData.area) : 0;
    if (area < 0) {
      setError("El área no puede ser negativa");
      return;
    }

    onSubmit({
      ...formData,
      name: formData.name.trim(),
      area: area,
      description: formData.description.trim(),
    });
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Agregar Zona Verde
        </h3>

        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <span className="font-semibold">Ciudad:</span> {cityName}
          </p>
          {parentZoneId && (
            <p className="text-sm text-blue-700">
              <span className="font-semibold">Zona padre:</span> {parentZoneId}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label
              htmlFor="zoneName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nombre de la Zona Verde *
            </label>
            <input
              id="zoneName"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Ej: Parque Central, Jardín de Rosas, etc."
              autoFocus
            />
          </div>

          {/* Tipo */}
          <div>
            <label
              htmlFor="zoneType"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tipo de Zona Verde *
            </label>
            <select
              id="zoneType"
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {zoneTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label} - {type.description}
                </option>
              ))}
            </select>
          </div>

          {/* Área */}
          <div>
            <label
              htmlFor="zoneArea"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Área (metros cuadrados)
            </label>
            <input
              id="zoneArea"
              type="number"
              min="0"
              step="0.1"
              value={formData.area}
              onChange={(e) => handleChange("area", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="0"
            />
          </div>

          {/* Descripción */}
          <div>
            <label
              htmlFor="zoneDescription"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Descripción
            </label>
            <textarea
              id="zoneDescription"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              placeholder="Descripción opcional de la zona verde..."
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Vista previa */}
          {formData.name && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="text-sm font-semibold text-green-800 mb-2">
                Vista previa:
              </h4>
              <div className="flex items-center gap-2">
                <span className="font-medium text-green-700">
                  {formData.name}
                </span>
                <span className="text-sm text-green-600">
                  ({zoneTypes.find((t) => t.value === formData.type)?.label})
                </span>
                {formData.area && (
                  <span className="text-sm text-green-600">
                    - {formData.area} m²
                  </span>
                )}
              </div>
              {formData.description && (
                <p className="text-sm text-green-600 mt-1">
                  {formData.description}
                </p>
              )}
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Agregar Zona
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all duration-200"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGreenZoneForm;
