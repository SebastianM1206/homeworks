import { useState } from 'react'

function CityList({ cities, onSelectCity, onRemoveCity, onConnectCities }) {
  const [selectedCities, setSelectedCities] = useState([])

  const handleCityClick = (city) => {
    onSelectCity(city)
  }

  const handleConnectClick = () => {
    if (selectedCities.length === 2) {
      onConnectCities(selectedCities[0].id, selectedCities[1].id)
      setSelectedCities([])
    }
  }

  const toggleCitySelection = (city) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter(c => c !== city))
    } else if (selectedCities.length < 2) {
      setSelectedCities([...selectedCities, city])
    }
  }

  return (
    <div className="city-list">
      <h3>Ciudades</h3>
      <div className="cities">
        {cities.map(city => (
          <div key={city.id} className="city-item">
            <div className="city-info">
              <h4>{city.name}</h4>
              <p>Conexiones: {city.connections.map(c => c.name).join(', ')}</p>
            </div>
            <div className="city-actions">
              <button onClick={() => handleCityClick(city)}>Ver detalles</button>
              <button onClick={() => onRemoveCity(city.id)}>Eliminar</button>
              <button
                onClick={() => toggleCitySelection(city)}
                className={selectedCities.includes(city) ? 'selected' : ''}
              >
                {selectedCities.includes(city) ? 'Seleccionado' : 'Seleccionar'}
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedCities.length === 2 && (
        <button onClick={handleConnectClick} className="connect-button">
          Conectar ciudades seleccionadas
        </button>
      )}
    </div>
  )
}

export default CityList 