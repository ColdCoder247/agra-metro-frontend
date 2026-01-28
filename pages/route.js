import { useState, useEffect } from "react";
import axios from "axios";
import Map from "../components/Map";

export default function Route() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [routeData, setRouteData] = useState(null);
  const [stationsList, setStationsList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/stations")
      .then(res => setStationsList(res.data));
  }, []);

  const findRoute = async () => {
    const res = await axios.get(`http://localhost:8000/route?source=${source}&destination=${destination}`);
    setRouteData(res.data);
  };

  return (
    <div>
      <h1>Route Finder</h1>
      <select onChange={e => setSource(e.target.value)} value={source}>
        <option value="">Select Source</option>
        {stationsList.map(s => <option key={s.station_code} value={s.station_code}>{s.name}</option>)}
      </select>
      <select onChange={e => setDestination(e.target.value)} value={destination}>
        <option value="">Select Destination</option>
        {stationsList.map(s => <option key={s.station_code} value={s.station_code}>{s.name}</option>)}
      </select>
      <button onClick={findRoute}>Find Route</button>

      {routeData && (
        <div>
          <p>From: {routeData.from}</p>
          <p>To: {routeData.to}</p>
          <p>Fare: ₹{routeData.fare}</p>
          <p>Stations: {routeData.stations.join(" → ")}</p>
          <Map stations={routeData.stations.map((name, idx) => ({
            name,
            lat: 27.1706 + idx*0.001,
            lng: 78.0400 + idx*0.001
          }))} />
        </div>
      )}
    </div>
  );
}