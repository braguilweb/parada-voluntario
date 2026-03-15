// src/components/Map/MapView.jsx
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Ícone personalizado (URL confiável)
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38]
});

// Componente auxiliar para centralizar mapa
function MapController({ position }) {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], 16, { duration: 1.5 });
    }
  }, [position, map]);
  
  return null;
}

export function MapView({ position, loading, error, height = '300px' }) {
  // Posição padrão: São Paulo centro
  const defaultPosition = [-23.5505, -46.6333];
  const center = position ? [position.lat, position.lng] : defaultPosition;

  return (
     <div style={{ ...styles.container, height }}>
      {loading && (
        <div style={styles.overlay}>
          <div style={styles.spinner}></div>
          <p>Obtendo localização...</p>
        </div>
      )}
      
      {error && (
        <div style={{ ...styles.overlay, background: '#fee2e2', color: '#991b1b' }}>
          <p>⚠️ {error}</p>
        </div>
      )}

      <MapContainer 
        center={center} 
        zoom={15} 
        style={styles.map}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController position={position} />
        
        {position && (
          <>
            <Circle 
              center={[position.lat, position.lng]}
              radius={position.accuracy || 50}
              pathOptions={{ color: '#059669', fillColor: '#059669', fillOpacity: 0.1 }}
            />
            <Marker position={[position.lat, position.lng]} icon={customIcon}>
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <strong>📍 Você está aqui</strong><br/>
                  <small>
                    Precisão: {Math.round(position.accuracy || 0)}m
                  </small>
                </div>
              </Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
}



const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '400px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px'
  },
  map: {
    width: '100%',
    height: '100%',
    zIndex: 1
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.95)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    gap: '12px'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #e5e7eb',
    borderTop: '4px solid #059669',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }
};