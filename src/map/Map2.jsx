import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { getCoordIti, getVeiculos } from "./MapAPI";
import L from "leaflet";

function Map({ itinerario }) {
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
          setVeiculos(dados.veiculos);
          console.log(dados)
        }
      } catch (err) {
        console.error("Erro ao carregar veículos:", err);
      }
    }

    fetchCoordIti();
    fetchVeiculos();

    // Atualiza a cada 30s
    const interval = setInterval(fetchVeiculos, 2000);
    return () => clearInterval(interval);
  }, [itinerario]);

  //--------------------------------------------
  //Utilizado para atualizar a posicao do mapa, mostrando o ponto de onibus e o onibus atual

  const pointA = [-19.90605425969247, -43.9638653695289]; // Ponto de onibus da Newton

  return (
    <MapContainer
      className="mapConfig"
      center={pointA}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", borderRadius: "20px" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      <Polyline positions={coordenadas} color="#21292D" />

      <Marker
        position={pointA}
        icon={L.icon({
          iconUrl: "/assets/bus-stop.png",
          iconSize: [65, 65],
          iconAnchor: [12, 12], // ajuste o ponto de ancoragem ao centro do ícone
        })}
      >
        <Popup>Parada de ônibus</Popup>
      </Marker>

      {veiculos.map(
        (veiculo) =>
          veiculo.lat !== undefined &&
          veiculo.long !== undefined && (
            <Marker
              key={veiculo.numVeicGestor}
              position={[veiculo.lat, veiculo.long]}
              icon={L.icon({
                iconUrl: "/assets/bus-icon.png",
                iconSize: [45, 45],
                iconAnchor: [12, 12],
              })}
            >
              <Popup>Veículo: {veiculo.descricao}</Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
}

export default Map;
