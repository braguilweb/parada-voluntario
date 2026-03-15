// src/components/Map/LocationMarker.jsx

import { useEffect } from "react";
import { Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";

// Ícone personalizado (evita problema de icone padrão do Leaflet não aparecer)
const customIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
});

export const LocationMarker = ({ position }) => {
    const map = useMap();
    const accuracy = position?.accuracy ?? 50;

    // Centraliza o mapa na posição do marcador
    useEffect(() => {
        if (position) {
            map.flyTo([position.lat, position.lng], 16, {
                duration: 1.5
            });
        }
    }, [position, map]);

    if (!position) return null;

    return (
        <>
        {/* Círculo de precisão (raio de erro GPS) */}
        <Circle 
            center={[position.lat, position.lng]}
            radius={accuracy || 50} // Usa precisão real ou 50m como fallback
            pathOptions={{ 
                color: '#059669',
                fillColor: '#059669',
                fillOpacity: 0.5,
                weight: 2 
            }}
        />

        {/* Marcador principal */}
        <Marker position={[position.lat, position.lng]} icon={customIcon}>
            <Popup>
                <div style={{ textAlign:'center'}}>
                    <strong>📍 Sua Localização</strong><br/>
                    <small>
                        Lat: {position.lat.toFixed(6)}<br/>
                        Lng: {position.lng.toFixed(6)}<br/>
                        Precisão: {Math.round(accuracy || 0)}m
                    </small>
                </div>                
            </Popup>
        </Marker>
        </>
    );
};
