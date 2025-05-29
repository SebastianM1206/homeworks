import { useState } from 'react'

function GreenZoneForm({ cityId, onAddGreenZone, onAddSubzone, zones }) {
  const [name, setName] = useState('')
  const [height, setHeight] = useState('')
  const [selectedZone, setSelectedZone] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim() && height) {
      if (selectedZone) {
        onAddSubzone(cityId, selectedZone, name.trim(), Number(height))
      } else {
        onAddGreenZone(cityId, name.trim(), Number(height))
      }
      setName('')
      setHeight('')
      setSelectedZone('')
    }
  }

  const renderZoneOptions = (zones, level = 0) => {
    return zones.map(zone => (
      <>
        <option key={zone.id} value={zone.id}>
          {'\u2500'.repeat(level)} {zone.name}
        </option>
        {zone.subzones.length > 0 && renderZoneOptions(zone.subzones, level + 1)}
      </>
    ))
  }

  return (
    <form onSubmit={handleSubmit} className="green-zone-form">
      <h3>Agregar Zona Verde</h3>
      <div className="form-group">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de la zona"
          required
        />
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Altura (metros)"
          required
          min="0"
          step="0.1"
        />
        <select
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value)}
        >
          <option value="">Nueva zona principal</option>
          {renderZoneOptions(zones)}
        </select>
        <button type="submit">
          {selectedZone ? 'Agregar Subzona' : 'Agregar Zona'}
        </button>
      </div>
    </form>
  )
}

export default GreenZoneForm 