import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './BuildingMap.css'

// it seems icons break in vite so i referred claude for this fix
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function BuildingMap() {
    const [buildings, setBuildings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('/data/buildings.json')
            .then(response => response.json())
            .then(json => {
                console.log('Building data:', json)
                setBuildings(json)
                setLoading(false)
            })
            .catch(err => {
                console.error('Error loading building data:', err)
                setError('Failed to load building data')
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <p>Loading building data...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div className="widget">
            <h2>Building Locations</h2>
            <div className="map-container">
                {/* i also referred google and claude for this openstreet map implementation as iam not familiar with it */}
                <MapContainer
                    center={[12.915, 77.608]}
                    zoom={13}
                    style={{ height: '380px', width: '100%' }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {buildings.map(building => (
                        <Marker key={building.id} position={building.geoLocation}>
                        <Popup>
                            <strong>{building.name}</strong><br />
                            City: {building.city}<br />
                            Area: {building.area} sq ft<br />
                            Floors: {building.totalFloors}<br />
                            Health Score: {building.healthScore}
                        </Popup>
                        </Marker>
                    ))}
                    
                </MapContainer>
            </div>
        </div>
    )

}