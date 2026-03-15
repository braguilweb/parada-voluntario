// src/components/Map/MapView.jsx
import { MapContainer, TileLayer } from "react-leaflet";
import { LocationMarker } from "./LocationMarker";
import 'leaflet/dist/leaflet.css';
import './MapView.css';

export const MapView = ({ position, loading, error }) => {
    // Posição padrão (São Paulo) enquanto carrega ou em caso de erro
    const defaultPosition = [-23.5505, -46.6333];
    const mapCenter = position ? [position.lat, position.lng] : defaultPosition;

    return (
        <div className="map-container">
            {loading && (
                <div className="map-loading">
                    <div className="spinner" />
                    <p>Obtendo localização precisa...</p>
                    <small>Permita o acesso quando solicitado  </small>
                </div>
            )}
            {error && (
                <div className="map-error">
                    <p>⚠️ {error}</p>
                    <button onClick={() => window.location.reload()}>
                        Tentar Novamente
                    </button>
                </div>
            )}

            <MapContainer
                center={mapCenter}
                zoom={15}
                scrollWheelZoom={true}
                className="leaflet-map"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LocationMarker
                    position={position}
                    accuracy={position?.accuracy}
                />
            </MapContainer>
        </div>
    );
}