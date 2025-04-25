import "./CardMap.css"
import Map from "../map/Map"

function CardMap({linha, itinerario, previsao, progress, date, hour}){
    return(
        <div className="cardMap">
            <div className="headerMap">
                <h5>linha</h5>
                <h1>{linha}</h1>
            </div>
            <div className="map">
                <Map itinerario={itinerario}></Map>
            </div>
            <div style={{
        height: '8px',
        background: '#242424',
        width: '100%',
        marginBottom: '10px',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          background: '#4caf50',
          width: `${progress}%`,
          transition: 'width 0.1s linear'
        }} />
      </div>
            <div className="footerMap">
                <div className="time">
                    <h5>chegada em</h5>
                    <h1>{previsao}</h1>
                </div>
                <div className="currentDateTime">
                    <h1>{hour}</h1>
                    <h5>{date}</h5>
                </div>
            </div>

        </div>
    )
}

export default CardMap;