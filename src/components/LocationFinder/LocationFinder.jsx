// src/components/LocationFinder/LocationFinder.jsx
import { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { useGeolocation } from '../../hooks/useGeoLocation';
import { MapView } from '../Map/MapView';
import { ShareButtons } from '../ShareButtons/ShareButtons';
import { ShareCard } from '../ShareCard/ShareCard';
import { getAccurateRoadPosition } from '../../utils/geolocation';
import { STORAGE_KEYS } from '../../constants';

export function LocationFinder() {
  const { position, error, loading, refresh } = useGeolocation();
  const [address, setAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const [shareImage, setShareImage] = useState(null);
  const [correctedPosition, setCorrectedPosition] = useState(null);
  
  // Busca o nome do usuário usando a chave correta das constantes
  const userName = localStorage.getItem(STORAGE_KEYS.userName) || 'Voluntário';

  // Busca endereço quando há posição (usa utilitário centralizado)
  useEffect(() => {
    if (!position) return;

    let active = true;
    setAddressLoading(true);

    (async () => {
      try {
        // Usa a função consolidada que já retorna a posição corrigida e o endereço formatado
        const result = await getAccurateRoadPosition();
        if (!active) return;

        setAddress({
          fullStreet: result.address.fullStreet,        // Endereço completo formatado
          street: result.address.street,              // Nome da rua
          number: result.address.number,              // Número
          neighborhood: result.address.neighbourhood,   // Bairro
          city: result.address.city,                  // Cidade
          state: result.address.state,                // Estado
          postcode: result.address.postcode,          // CEP
          accuracy: result.position.accuracy,         // Precisão da posição final
          originalLat: result.originalPosition.lat,     // Latitude original do GPS
          originalLng: result.originalPosition.lng,     // Longitude original do GPS
          wasCorrected: result.position.wasCorrected,   // Se a posição foi corrigida
        });

        // Armazena a posição corrigida para usar no mapa e compartilhamento
        setCorrectedPosition(result.position);

      } catch (err) {
        console.error('Erro ao buscar endereço:', err);
        // Adiciona um feedback visual para o usuário em caso de erro na geocodificação
        // setError(err.message || 'Não foi possível obter o endereço para esta localização.');
      } finally {
        if (active) setAddressLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [position]);

  // Gera a imagem de compartilhamento automaticamente quando o endereço estiver pronto
  useEffect(() => {
    if (!address || !position) return;

    const generateShareImage = async () => {
      // Aguarda um pouco para garantir que o mapa renderizou
      await new Promise(resolve => setTimeout(resolve, 1500));

      try {
        const element = document.getElementById('share-card-capture');
        if (!element) return;

        const canvas = await html2canvas(element, {
          useCORS: true,
          scale: 2,
          logging: false,
          backgroundColor: '#f5f5f5',
          width: 600,
          height: element.scrollHeight,
        });

        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        if (blob) {
          const file = new File([blob], 'parada-voluntario.png', { type: 'image/png' });
          setShareImage(file);
          console.log('✅ Imagem de compartilhamento gerada com sucesso!');
        }
      } catch (err) {
        console.error('Erro ao gerar imagem de compartilhamento:', err);
      }
    };

    generateShareImage();
  }, [address, position]);

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
        <div style={styles.card} className="location-card-to-capture">
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

              {/* Endereço completo formatado - prioriza a versão corrigida com detalhes da rua */}
              <h2 style={styles.street}>{address.fullStreet || address.street}</h2>
              {/* Endereço completo - agora usa fullStreet */}
              <p style={styles.neighborhood}>{address.neighborhood}</p>
              
              {/* Cidade, Estado, CEP */}
              <p style={styles.location}>
                {address.city}{address.state ? ', ' + address.state : ''}
                {address.postcode ? ` • ${address.postcode}` : ''}
              </p>

              {/* Coordenadas - agora mostra se foi corrigida */}
              <div style={styles.coordsSection}>
                <div style={styles.coords}>
                  🔗 {correctedPosition.lat.toFixed(6)}, {correctedPosition.lng.toFixed(6)}
                  {address.wasCorrected && <span style={styles.correctedBadge}> Ajustado</span>}
                </div>
              </div>

              {/* Data/hora */}
              <div style={styles.datetime}>
                🕐 {new Date().toLocaleString('pt-BR')}
              </div>

              {/* Botões de Compartilhamento */}
              <ShareButtons 
                position={correctedPosition}
                userName={userName} 
                address={address}
                shareImage={shareImage}
              />
            </>
          ) : null}
        </div>
      )}

      {/* MAPA NOVO - Adicionado abaixo do card */}
      {correctedPosition && (
        <div style={styles.mapSection}>
          <h4 style={styles.mapTitle}>Visualização no Mapa</h4>
          <MapView position={correctedPosition} loading={false} error={null} />
        </div>
      )}

      {/* Card escondido para captura de imagem */}
      {correctedPosition && address && (
        <ShareCard 
          userName={userName}
          address={address}
          position={correctedPosition}
        />
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
  correctedBadge: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    padding: '2px 8px',
    borderRadius: '4px',
    marginLeft: '8px',
    fontSize: '10px',
    fontWeight: 'bold',
  },
  loading: {
    padding: '40px',
    color: '#6b7280',
  },
};
