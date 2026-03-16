// src/components/LocationFinder/LocationFinder.jsx
import { useState, useEffect } from 'react';
import { useGeolocation } from '../../hooks/useGeoLocation';
import { MapView } from '../Map/MapView';
import { ShareButtons } from '../ShareButtons/ShareButtons';
import { getAddressFromCoords } from '../../utils/geocoding'; // vamos criar isso

export function LocationFinder() {
  const { position, error, loading, refresh } = useGeolocation();
  const [address, setAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const userName = localStorage.getItem('paradaUserName') || 'Voluntário';

  // Busca endereço quando há posição (usa utilitário centralizado)
  useEffect(() => {
    if (!position) return;

    let active = true;
    setAddressLoading(true);

    (async () => {
      try {
        const data = await getAddressFromCoords(position.lat, position.lng);
        if (!active) return;

        const addr = data.address || {};
        setAddress({
          street: addr.road || addr.pedestrian || 'Rua não identificada',
          neighborhood: addr.suburb || addr.neighbourhood || 'Bairro não identificado',
          city: addr.city || addr.town || addr.village || 'Cidade não identificada',
          state: addr.state || '',
          postcode: addr.postcode || '',
          accuracy: position.accuracy
        });
      } catch (err) {
        console.error('Erro ao buscar endereço:', err);
      } finally {
        if (active) setAddressLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [position]);


  const handleGetLocation = () => {
    refresh();
  };

  return (
    <div style={styles.container}>
      {/* Botão principal */}
      <button 
        onClick={handleGetLocation}
        disabled={loading}
        style={styles.mainButton}
      >
        {loading ? '📡 Buscando...' : '🔄 Atualizar Localização'}
      </button>

      {/* Card de informações - igual estava antes */}
      {(address || loading || error) && (
        <div style={styles.card}>
          {loading || addressLoading ? (
            <div style={styles.loading}>Obtendo localização...</div>
          ) : error ? (
            <div style={{ color: '#b91c1c', fontWeight: 600 }}>
              ⚠️ {error}
            </div>
          ) : address ? (
            <>
              {/* Badge de precisão */}
              <div style={styles.badge}>
                ✓ Boa (~{Math.round(address.accuracy || 17)}m)
              </div>

              {/* Endereço completo */}
              <h2 style={styles.street}>{address.street}</h2>
              <p style={styles.neighborhood}>{address.neighborhood}</p>
              
              {/* Cidade, Estado, CEP */}
              <p style={styles.location}>
                {address.city}{address.state ? ', ' + address.state : ''}
                {address.postcode ? ` • ${address.postcode}` : ''}
              </p>

              {/* Coordenadas */}
              <div style={styles.coordsSection}>
                <div style={styles.coords}>
                  🔗 {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
                </div>
              </div>

              {/* Data/hora */}
              <div style={styles.datetime}>
                🕐 {new Date().toLocaleString('pt-BR')}
              </div>

              {/* Botões */}
              <ShareButtons position={position} userName={userName} address={address} />
            </>
          ) : null}
        </div>
      )}

      {/* MAPA NOVO - Adicionado abaixo do card */}
      {position && (
        <div style={styles.mapSection}>
          <h4 style={styles.mapTitle}>Visualização no Mapa</h4>
          <MapView position={position} loading={false} error={null} />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px 0',
  },
  mainButton: {
    width: '100%',
    padding: '20px',
    background: '#059669',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '20px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    textAlign: 'center',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  badge: {
    display: 'inline-block',
    background: '#fef3c7',
    color: '#92400e',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '16px',
  },
  street: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 8px 0',
    lineHeight: '1.2',
  },
  neighborhood: {
    fontSize: '16px',
    color: '#6b7280',
    margin: '0 0 12px 0',
    fontWeight: '500',
  },
  location: {
    fontSize: '14px',
    color: '#059669',
    fontWeight: '600',
    margin: '0 0 16px 0',
  },
  coordsSection: {
    background: '#f9fafb',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '16px',
    border: '1px solid #e5e7eb',
  },
  coords: {
    fontFamily: 'monospace',
    color: '#374151',
    fontSize: '13px',
    margin: '0',
    fontWeight: '500',
  },
  datetime: {
    color: '#6b7280',
    fontSize: '14px',
    marginBottom: '20px',
  },
  mapSection: {
    marginTop: '20px',
  },
  mapTitle: {
    fontSize: '16px',
    color: '#374151',
    marginBottom: '12px',
    textAlign: 'center',
  },
  loading: {
    padding: '40px',
    color: '#6b7280',
  },
};