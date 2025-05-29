import { useState } from 'react'
import './App.css'
import City from './models/City'
import GreenZone from './models/GreenZone'
import CityList from './components/CityList'
import CityForm from './components/CityForm'
import GreenZoneForm from './components/GreenZoneForm'
import CityGraph from './components/CityGraph'
import GreenZoneTree from './components/GreenZoneTree'

function App() {
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState(null)

  const addCity = (name) => {
    const newCity = new City(name)
    setCities([...cities, newCity])
  }

  const removeCity = (cityId) => {
    const cityToRemove = cities.find(city => city.id === cityId)
    if (cityToRemove) {
      // Remove connections to this city
      cities.forEach(city => {
        city.removeConnection(cityToRemove)
      })
      setCities(cities.filter(city => city.id !== cityId))
      if (selectedCity && selectedCity.id === cityId) {
        setSelectedCity(null)
      }
    }
  }

  const addGreenZone = (cityId, zoneName, height) => {
    const city = cities.find(c => c.id === cityId)
    if (city) {
      const newZone = new GreenZone(zoneName, height)
      city.addGreenZone(newZone)
      setCities([...cities])
    }
  }

  const addSubzone = (cityId, parentZoneId, zoneName, height) => {
    const city = cities.find(c => c.id === cityId)
    if (city) {
      const findZone = (zones, id) => {
        for (let zone of zones) {
          if (zone.id === id) return zone
          const subzone = findZone(zone.subzones, id)
          if (subzone) return subzone
        }
        return null
      }

      const parentZone = findZone(city.greenZones, parentZoneId)
      if (parentZone) {
        const newSubzone = new GreenZone(zoneName, height)
        parentZone.addSubzone(newSubzone)
        setCities([...cities])
      }
    }
  }

  const connectCities = (cityId1, cityId2) => {
    const city1 = cities.find(c => c.id === cityId1)
    const city2 = cities.find(c => c.id === cityId2)
    if (city1 && city2) {
      city1.addConnection(city2)
      setCities([...cities])
    }
  }

  return (
    <div className="app">
      <h1>Red de Ciudades</h1>
      <div className="main-container">
        <div className="left-section">
          <div className="cities-section">
            <CityForm onAddCity={addCity} />
            <CityList 
              cities={cities}
              onSelectCity={setSelectedCity}
              onRemoveCity={removeCity}
              onConnectCities={connectCities}
            />
          </div>
          <div className="visualization-section">
            <CityGraph cities={cities} />
          </div>
        </div>
        {selectedCity && (
          <div className="right-section">
            <div className="green-zones-section">
              <h2>Zonas Verdes de {selectedCity.name}</h2>
              <p>Altura total: {selectedCity.getTotalHeight()} metros</p>
              <p>Número de zonas verdes: {selectedCity.getGreenZonesCount()}</p>
              <GreenZoneForm 
                cityId={selectedCity.id}
                onAddGreenZone={addGreenZone}
                onAddSubzone={addSubzone}
                zones={selectedCity.greenZones}
              />
            </div>
            <div className="visualization-section">
              <GreenZoneTree zones={selectedCity.greenZones} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
