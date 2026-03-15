// ============================================
// LOCATIONMAP - Mapa com posição corrigida vs original
// ============================================

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Circle, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Ícone VERDE: posição final (centro da via) - MAIOR
const correctedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Ícone VERMELHO: posição GPS original - MENOR
const originalIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [18, 30],
  iconAnchor: [9, 30],
  popupAnchor: [1, -25],
  shadowSize: [30, 30]
})

// Centraliza e ajusta zoom
function MapController({ position }) {
  const map = useMap()
  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], 17)
    }
  }, [position, map])
  return null
}

export function LocationMap({ position, originalPosition, wasCorrected }) {
  
  // Fallback se não tiver posição
  const center = position ? [position.lat, position.lng] : [-23.5505, -46.6333]

  return (
    <div style={styles.container}>
      <MapContainer
        center={center}
        zoom={17}
        style={styles.map}
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={false} // Evita zoom acidental com scroll
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        {position && (
          <>
            {/* Controla centro e zoom */}
            <MapController position={position} />
            
            {/* ===== CÍRCULO PRINCIPAL: 50m de raio (RAIO FIXO DO PROJETO) ===== */}
            <Circle
              center={[position.lat, position.lng]}
              radius={50}  // 50 METROS - fixo conforme requisito do usuário
              pathOptions={{
                color: '#059669',      // Verde
                fillColor: '#059669',
                fillOpacity: 0.12,
                weight: 2
              }}
            />
            
            {/* Círculo de precisão real (tracejado, maior) */}
            {position.originalAccuracy > 20 && (
              <Circle
                center={[position.lat, position.lng]}
                radius={position.originalAccuracy}
                pathOptions={{
                  color: '#f59e0b',
                  fillColor: '#f59e0b',
                  fillOpacity: 0.05,
                  weight: 1,
                  dashArray: '4,8'
                }}
              />
            )}
            
            {/* ===== MARCADOR PRINCIPAL: Centro da via (VERDE) ===== */}
            <Marker 
              position={[position.lat, position.lng]} 
              icon={correctedIcon}
            />
            
            {/* ===== MARCADOR SECUNDÁRIO: GPS original (VERMELHO) ===== */}
            {/* Só aparece se houve correção significativa */}
            {wasCorrected && originalPosition && (
              <>
                <Marker 
                  position={[originalPosition.lat, originalPosition.lng]} 
                  icon={originalIcon}
                />
                
                {/* Linha conectando os dois pontos */}
                <Polyline
                  positions={[
                    [originalPosition.lat, originalPosition.lng],
                    [position.lat, position.lng]
                  ]}
                  pathOptions={{
                    color: '#f97316',
                    weight: 2,
                    dashArray: '6,10',
                    opacity: 0.7
                  }}
                />
              </>
            )}
            
          </>
        )}
      </MapContainer>
      
      {/* ===== LEGENDA ===== */}
      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <span style={{...styles.dot, background: '#16a34a'}}></span>
          <span>Centro da via (usado)</span>
        </div>
        
        {wasCorrected && (
          <div style={styles.legendItem}>
            <span style={{...styles.dot, background: '#dc2626'}}></span>
            <span>Posição GPS original</span>
          </div>
        )}
        
        <div style={styles.legendItem}>
          <span style={{...styles.dot, background: '#059669', opacity: 0.3, border: '2px solid #059669'}}></span>
          <span>Raio de atuação: 50m</span>
        </div>
      </div>
      
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