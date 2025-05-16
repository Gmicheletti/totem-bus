import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { getCoordIti, getVeiculos } from "./MapAPI";
import L from "leaflet";

function Map({ itinerario, numVeicGestor }) {
  const [coordenadas, setCoordenadas] = useState([]);
  const [veiculos, setVeiculos] = useState([]);

  //--------------------------------------------
  //Busca as coordenadas de um itinerario (caminho que o onibus faz)
  useEffect(() => {
    async function fetchCoordIti() {
      try {
        const dados = await getCoordIti(itinerario);
        if (dados.sucesso) {
          const coords = dados.itinerarios.map((p) => [p.coordY, p.coordX]);
          setCoordenadas(coords);
        }
      } catch (err) {
        console.error("Erro ao carregar itinerário:", err);
      }
    }

//--------------------------------------------
// Busca as posicoes dos onibus dentro do itinerario (caminho que o onibus faz)
    async function fetchVeiculos() {
      try {
        const dados = await getVeiculos(itinerario);
        if (dados.sucesso) {

          // Busca o onibus que queremos dentro da lista de onibus da mesma linha que esta no mesmo itinerario
          const veiculoEncontrado = dados.veiculos.find(
            (veiculo) => veiculo.numVeicGestor === numVeicGestor
          );
          setVeiculos(veiculoEncontrado);
        }
      } catch (err) {
        console.error("Erro ao carregar veículos:", err);
      }
    }

    fetchCoordIti();
    fetchVeiculos();

    // Atualiza a cada 30s
    const interval = setInterval(fetchVeiculos, 15000);
    return () => clearInterval(interval);
  }, [itinerario]);

  //--------------------------------------------
  //Utilizado para atualizar a posicao do mapa, mostrando o ponto de onibus e o onibus atual
  function FitBounds({ bounds }) {
    const map = useMap();

    useEffect(() => {
      if (bounds && bounds.length === 2) {
        map.fitBounds(bounds);
      }
    }, [bounds, map]);

    return null;
  }

  const pointA = [-19.90605425969247, -43.9638653695289]; // Ponto de onibus da Newton
  const pointB = veiculos.lat !== undefined && veiculos.long !== undefined
      ? [veiculos.lat, veiculos.long]
      : null;

  const bounds = pointB ? [pointA, pointB] : null;

  return (
    <MapContainer
      className="mapConfig"
      center={pointA}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: "500px", width: "100%", borderRadius: "20px" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline positions={coordenadas} color="blue" />

      <Marker
        position={pointA}
        icon={L.icon({
          iconUrl: "/assets/bus-stop.png",
          iconSize: [45, 45],
          iconAnchor: [12, 12], // ajuste o ponto de ancoragem ao centro do ícone
        })}
      >
        <Popup>Parada de ônibus</Popup>
      </Marker>

      {veiculos.lat !== undefined && veiculos.long !== undefined && (
        <Marker
          key={veiculos.numVeicGestor}
          position={[veiculos.lat, veiculos.long]}
          icon={L.icon({
            iconUrl: "/assets/bus-icon.png",
            iconSize: [25, 25],
          })}
        >
          <Popup>Veículo: {veiculos.descricao}</Popup>
        </Marker>
      )}

      {bounds && <FitBounds bounds={bounds} />}
    </MapContainer>
  );
}

export default Map;
