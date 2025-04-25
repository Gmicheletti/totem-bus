
import { MapContainer, TileLayer, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { getCoordIti } from '../app/AppAPI' // ajuste o caminho se necessário

function Map({itinerario}) {
  const [coordenadas, setCoordenadas] = useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCoordIti(itinerario)
        if (data.sucesso) {
          const coords = data.itinerarios.map(p => [p.coordY, p.coordX])
          setCoordenadas(coords)
        }
      } catch (err) {
        console.error('Erro ao carregar itinerário:', err)
      }
    }

    fetchData()
  }, [itinerario])

  if (coordenadas.length === 0) return <p>Carregando mapa...</p>
  const position = [-19.9062245,-43.9637809]; // Newton Paiva - Carlos Luz

  return (

    
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={coordenadas} color="blue" />
    </MapContainer>
  )
}

export default Map;





