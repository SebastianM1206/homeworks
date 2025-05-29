import { useState } from 'react'

function CityForm({ onAddCity }) {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      onAddCity(name.trim())
      setName('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="city-form">
      <h3>Agregar Ciudad</h3>
      <div className="form-group">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de la ciudad"
          required
        />
        <button type="submit">Agregar</button>
      </div>
    </form>
  )
}

export default CityForm 