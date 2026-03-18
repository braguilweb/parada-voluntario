// src/components/ShareCard/ShareCard.jsx
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import { APP_CONFIG } from '../../constants';

export function ShareCard({ userName, address, position, customNote = '' }) {
  if (!position || !address) return null;

  const formatDateTime = () => {
    const now = new Date();
    const options = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    const formatted = now.toLocaleDateString('pt-BR', options);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  return (
    <div style={styles.container} id="share-card-capture">
      {/* Header com logo */}
      <div style={styles.header}>
        <div style={styles.logo}>📍</div>
        <h1 style={styles.appName}>Parei Aqui</h1>
      </div>

      {/* Informações do usuário */}
      <div style={styles.userSection}>
        <div style={styles.userIcon}>👤</div>
        <h2 style={styles.userName}>{userName}</h2>
      </div>

      {/* Endereço */}
      <div style={styles.addressSection}>
        <div style={styles.addressLine}>
          <span style={styles.icon}>📍</span>
          <span style={styles.street}>{address.fullStreet || address.street}</span>
        </div>
        <div style={styles.addressLine}>
          <span style={styles.neighborhood}>{address.neighborhood}</span>
        </div>
        <div style={styles.addressLine}>
          <span style={styles.city}>
            {address.city}{address.state ? ', ' + address.state : ''}
          </span>
        </div>
        {address.postcode && (
          <div style={styles.addressLine}>
            <span style={styles.postcode}>CEP: {address.postcode}</span>
          </div>
        )}
      </div>

      {/* Mapa */}
      <div style={styles.mapContainer}>
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={16}
          style={styles.map}
          zoomControl={false}
          attributionControl={false}
          dragging={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          touchZoom={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Circle
            center={[position.lat, position.lng]}
            radius={address.accuracy || 50}
            pathOptions={{ color: APP_CONFIG.colors.primary, fillColor: APP_CONFIG.colors.primary, fillOpacity: 0.2 }}
          />
          <Marker position={[position.lat, position.lng]} />
        </MapContainer>
      </div>

      {/* Data e hora */}
      <div style={styles.dateTime}>
        <span style={styles.icon}>🕐</span>
        <span>{formatDateTime()}</span>
      </div>

      {/* Motivo (se existir) */}
      {customNote && (
        <div style={styles.noteSection}>
          <span style={styles.icon}>📝</span>
          <span style={styles.note}>{customNote}</span>
        </div>
      )}

      {/* Footer com CTA */}
      <div style={styles.footer}>
        <p style={styles.cta}>Baixe o app Parei Aqui</p>
        <p style={styles.url}>parei-aqui.vercel.app</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
  position: 'fixed', // ou 'absolute' com top/left normais
  top: 0,
  left: 0,
  width: '600px',
  background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
  borderRadius: '24px',
  padding: '32px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
  opacity: 0, // 👈 invisível mas com dimensões
  pointerEvents: 'none', // 👈 não interfere com cliques
  zIndex: -1, // 👈 fica atrás de tudo
},
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  logo: {
    fontSize: '48px',
  },
  appName: {
    fontSize: '32px',
    fontWeight: '800',
    color: APP_CONFIG.colors.primary,
    margin: 0,
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '24px',
    padding: '16px',
    background: 'white',
    borderRadius: '16px',
  },
  userIcon: {
    fontSize: '32px',
  },
  userName: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#111827',
    margin: 0,
  },
  addressSection: {
    background: 'white',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '20px',
  },
  addressLine: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  },
  icon: {
    fontSize: '18px',
  },
  street: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827',
  },
  neighborhood: {
    fontSize: '18px',
    color: '#6b7280',
    fontWeight: '500',
    marginLeft: '26px',
  },
  city: {
    fontSize: '16px',
    color: APP_CONFIG.colors.primary,
    fontWeight: '600',
    marginLeft: '26px',
  },
  postcode: {
    fontSize: '14px',
    color: '#9ca3af',
    marginLeft: '26px',
  },
  mapContainer: {
    width: '100%',
    height: '300px',
    borderRadius: '16px',
    overflow: 'hidden',
    marginBottom: '20px',
    border: '3px solid white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  dateTime: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px',
    background: 'white',
    borderRadius: '12px',
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '16px',
  },
  noteSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '16px',
    background: '#fef3c7',
    borderRadius: '12px',
    marginBottom: '20px',
  },
  note: {
    fontSize: '16px',
    color: '#92400e',
    fontWeight: '500',
  },
  footer: {
    textAlign: 'center',
    paddingTop: '20px',
    borderTop: '2px solid #e5e7eb',
  },
  cta: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 8px 0',
  },
  url: {
    fontSize: '16px',
    color: APP_CONFIG.colors.primary,
    fontWeight: '600',
    margin: 0,
  },
};
