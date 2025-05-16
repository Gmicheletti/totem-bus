import "./CardMap.css";
import Map from "../map/Map";

//--------------------------------------------
//recebe e passa os parametros das linhas para dentro do componente Map
function CardMap({ linha, itinerario, previsao, progress, date, hour, numVeicGestor }) {
  return (
    <div className="cardMap">
      <div className="headerMap cardStyle">
        <h1>{hour}</h1>
        <h5>{date}</h5>
      </div>
      <div className="map">
        <Map itinerario={itinerario} numVeicGestor={numVeicGestor}></Map>
      </div>

      <div className="footerMap cardStyle">
        <div className="time">
          <h5>Linha</h5>
          <h1>{linha}</h1>
        </div>
        <div className="time">
          <h5>Chegada em</h5>
          <h1>{previsao}</h1>
        </div>
      </div>
      <div
        style={{
          height: "8px",
          background: "#21292D",
          width: "100%",
          marginBottom: "10px",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "#4caf50",
            width: `${progress}%`,
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  );
}

export default CardMap;
