import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { getCoordIti, getVeiculos } from './MapAPI'
import L from 'leaflet'

function Map({ itinerario }) {
  const [coordenadas, setCoordenadas] = useState([])
  const [veiculos, setVeiculos] = useState([])

  const position = [-19.904894, -43.958238] // Centro inicial
  
  useEffect(() => {
    async function fetchCoordIti() {
      try {
        const dados = await getCoordIti(itinerario)
        if (dados.sucesso) {
          const coords = dados.itinerarios.map(p => [p.coordY, p.coordX])
          setCoordenadas(coords)
        }
      } catch (err) {
        console.error('Erro ao carregar itinerário:', err)
      }
    }

    async function fetchVeiculos() {
      try {
        const dados = await getVeiculos(itinerario)
        if (dados.sucesso) {
          setVeiculos(dados.veiculos)
        }
      } catch (err) {
        console.error('Erro ao carregar veículos:', err)
      }
    }

    fetchCoordIti()
    fetchVeiculos()

    // Atualiza a cada 15s
    const interval = setInterval(fetchVeiculos, 15000)
    return () => clearInterval(interval)

  }, [itinerario])

  if (coordenadas.length === 0) return     <MapContainer
  className="mapConfig"
  center={position}
  zoom={15}
  scrollWheelZoom={false}
  style={{ height: '500px', width: '100%', borderRadius: '20px'}}
></MapContainer>

  return (
    <MapContainer
      className="mapConfig"
      center={position}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: '500px', width: '100%', borderRadius: '20px'}}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline positions={coordenadas} color="blue" />
      
      <Marker
        position={[-19.90605425969247, -43.9638653695289]}
        icon={L.icon({
        iconUrl: '/assets/bus-stop.png',
        iconSize: [45, 45],
        iconAnchor: [12, 12] // ajuste o ponto de ancoragem ao centro do ícone
        })}>
        <Popup>Parada de ônibus</Popup>
      </Marker>

      {veiculos.map((v, idx) => (
        <Marker
          key={idx}
          position={[v.lat, v.long]}
          icon={L.icon({
            iconUrl: '/assets/bus-icon.png', // substitua por um ícone customizado
            iconSize: [25, 25]
          })}
        >
          <Popup>Veículo: {v.descricao}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default Map
