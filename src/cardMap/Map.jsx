// App.js
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "./Map.css"


function Map() {
  const position = [-19.9062245,-43.9637809]; // Newton Paiva - Carlos Luz

  return (
    <div className='mapConfig' style={{height:'calc(100vh - 200px)', width: '100%' }}>
      <MapContainer center={position} zoom={40} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
}

export default Map;
