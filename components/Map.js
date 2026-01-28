import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({ stations }) {
  const center = [27.1751, 78.0421];
  return (
    <MapContainer center={center} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {stations.map((st, idx) => (
        <Marker key={idx} position={[st.lat, st.lng]}>
          <Popup>{st.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}