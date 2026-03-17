// ============================================
// LOCATIONMAP - Mapa sincronizado com o mapa principal
// ============================================

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Ícone personalizado (URL confiável) - mesmo do MapView
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38]
})

// Centraliza e ajusta zoom
function MapController({ position }) {
  const map = useMap()
  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], 16, { duration: 1.5 })
    }
  }, [position, map])
  return null
}

export function LocationMap({ position }) {
  
  // Fallback se não tiver posição
  const center = position ? [position.lat, position.lng] : [-23.5505, -46.6333]

  return (
    <div style={styles.container}>
      <MapContainer
        center={center}
        zoom={16}
        style={styles.map}
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        {position && (
          <>
            {/* Controla centro e zoom */}
            <MapController position={position} />
            
            {/* Círculo de precisão */}
            <Circle 
              center={[position.lat, position.lng]}
              radius={position.accuracy || 50}
              pathOptions={{ color: '#059669', fillColor: '#059669', fillOpacity: 0.1 }}
            />
            
            {/* Marcador principal */}
            <Marker position={[position.lat, position.lng]} icon={customIcon} />
            
          </>
        )}
      </MapContainer>
      
    </div>
  )
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: 'inherit', // Herda do pai
  },
  
  map: {
    width: '100%',
    height: '100%',
    minHeight: 'inherit',
  },
  
  legend: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    background: 'rgba(255,255,255,0.95)',
    padding: 12,
    borderRadius: 8,
    fontSize: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    backdropFilter: 'blur(4px)',
  },
  
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
    color: '#374151',
  },
  
  dot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    flexShrink: 0,
  },
}