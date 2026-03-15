import { useState } from 'react'
import { getCurrentPosition, reverseGeocode } from '../../utils/geolocation'

export function LocationFinder({ onLocationFound }) {
  
  const [status, setStatus] = useState('idle') // idle | loading | success | error | blocked
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)

  const handleClick = async () => {
    setStatus('loading')
    setError(null)
    setLocation(null)

    try {
      console.log('Solicitando GPS...')
      const position = await getCurrentPosition()
      
      console.log('GPS OK:', position)
      const address = await reverseGeocode(position.lat, position.lng)
      
      const result = { position, address, capturedAt: new Date().toLocaleString('pt-BR') }
      
      setLocation(result)
      setStatus('success')
      onLocationFound?.(result)
      
    } catch (err) {
      console.error('Erro:', err)
      
      // Detecta especificamente bloqueio de permissão
      if (err.message.includes('Permissão negada') || 
          err.message.includes('blocked') ||
          err.message.includes('denied')) {
        setStatus('blocked')
      } else {
        setStatus('error')
      }
      
      setError(err.message)
    }
  }

  // ===== RENDER =====

  return (
    <div style={styles.container}>
      
      {/* BOTÃO */}
      <button 
        onClick={handleClick}
        disabled={status === 'loading'}
        style={styles.button}
      >
        {status === 'loading' ? '⏳ Obtendo localização...' : '📍 Onde estou?'}
      </button>

      {/* IDLE - Instrução inicial */}
      {status === 'idle' && (
        <p style={styles.hint}>
          Toque acima e <strong>permita</strong> o GPS quando perguntado
        </p>
      )}

      {/* LOADING */}
      {status === 'loading' && (
        <div style={styles.loadingBox}>
          <p>🛰️ Conectando aos satélites...</p>
          <p style={styles.loadingSub}>Aceite a permissão se aparecer</p>
        </div>
      )}

      {/* BLOQUEADO - Tela especial de ajuda */}
      {status === 'blocked' && (
        <div style={styles.blockedBox}>
          <div style={styles.blockedIcon}>🚫</div>
          <h3 style={styles.blockedTitle}>GPS Bloqueado</h3>
          
          <p style={styles.blockedText}>
            Você negou o acesso anteriormente. Para desbloquear:
          </p>

          {/* Android */}
          <div style={styles.helpCard}>
            <strong>📱 Android (Chrome):</strong>
            <ol style={styles.helpList}>
              <li>Chrome → ⋮ → <strong>Configurações</strong></li>
              <li><strong>Configurações do site</strong> → Localização</li>
              <li>Encontre este site e toque <strong>Permitir</strong></li>
              <li>Volte aqui e toque <strong>"Onde estou?"</strong> novamente</li>
            </ol>
          </div>

          {/* iPhone */}
          <div style={styles.helpCard}>
            <strong>🍎 iPhone (Safari):</strong>
            <ol style={styles.helpList}>
              <li><strong>Ajustes</strong> → Safari → Avançado</li>
              <li><strong>Dados do site</strong> → busque este site</li>
              <li>Toque <strong>Editar</strong> → <strong>Apagar</strong></li>
              <li>Volte aqui e recarregue a página</li>
            </ol>
          </div>

          <button 
            onClick={() => window.location.reload()}
            style={styles.reloadBtn}
          >
            🔄 Recarregar página
          </button>
          
          <button 
            onClick={() => setStatus('idle')}
            style={styles.tryAgainBtn}
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* ERRO GENÉRICO */}
      {status === 'error' && (
        <div style={styles.errorBox}>
          <p>{error}</p>
          <button onClick={() => setStatus('idle')} style={styles.retryBtn}>
            🔄 Tentar novamente
          </button>
        </div>
      )}

      {/* SUCESSO */}
      {status === 'success' && location && (
        <div style={styles.resultBox}>
          
          {/* Qualidade */}
          <div style={qualityStyle(location.position.accuracy)}>
            {location.position.accuracy <= 10 ? '🎯 Excelente' : 
             location.position.accuracy <= 50 ? '✓ Boa' : '⚠ Regular'}
            {' '} (~{Math.round(location.position.accuracy)}m)
          </div>

          {/* Endereço */}
          <div style={styles.addressBlock}>
            <h2 style={styles.street}>{location.address.fullStreet}</h2>
            <p style={styles.neighbourhood}>Bairro {location.address.neighbourhood}</p>
            {location.address.city && <p style={styles.city}>{location.address.city}</p>}
          </div>

          <p style={styles.coordinates}>
            {location.position.lat.toFixed(6)}, {location.position.lng.toFixed(6)}
          </p>
          <p style={styles.timestamp}>📍 {location.capturedAt}</p>

          {/* Ações */}
          <div style={styles.actions}>
            <button style={styles.whatsappBtn}>📱 WhatsApp</button>
            <button style={styles.copyBtn}>📋 Copiar</button>
          </div>

        </div>
      )}

    </div>
  )
}

// Estilos dinâmicos
const qualityStyle = (accuracy) => ({
  display: 'inline-block',
  padding: '8px 16px',
  borderRadius: 20,
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 16,
  background: accuracy <= 10 ? '#d1fae5' : accuracy <= 50 ? '#fef3c7' : '#fee2e2',
  color: accuracy <= 10 ? '#065f46' : accuracy <= 50 ? '#92400e' : '#991b1b',
})

const styles = {
  container: { padding: 20 },
  
  button: {
    width: '100%',
    padding: 20,
    background: '#059669',
    color: 'white',
    border: 'none',
    borderRadius: 16,
    fontSize: 18,
    fontWeight: 700,
    cursor: 'pointer',
  },
  
  hint: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
    marginTop: 12,
  },
  
  loadingBox: {
    marginTop: 20,
    padding: 20,
    background: '#f0fdf4',
    borderRadius: 12,
    textAlign: 'center',
    color: '#059669',
  },
  loadingSub: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 8,
  },

  // BLOQUEADO - Destaque especial
  blockedBox: {
    marginTop: 20,
    padding: 24,
    background: '#fff7ed',
    border: '2px solid #f97316',
    borderRadius: 16,
    textAlign: 'center',
  },
  blockedIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  blockedTitle: {
    color: '#c2410c',
    fontSize: 20,
    marginBottom: 12,
  },
  blockedText: {
    color: '#7c2d12',
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 1.5,
  },
  helpCard: {
    background: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    textAlign: 'left',
    fontSize: 13,
    color: '#374151',
  },
  helpList: {
    margin: '8px 0 0 0',
    paddingLeft: 20,
    lineHeight: 1.8,
  },
  reloadBtn: {
    width: '100%',
    padding: 14,
    background: '#f97316',
    color: 'white',
    border: 'none',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: 10,
  },
  tryAgainBtn: {
    padding: '10px 20px',
    background: 'none',
    border: '1px solid #f97316',
    color: '#c2410c',
    borderRadius: 8,
    fontSize: 13,
    cursor: 'pointer',
  },

  errorBox: {
    marginTop: 20,
    padding: 20,
    background: '#fef2f2',
    borderRadius: 12,
    color: '#dc2626',
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: 12,
    padding: '10px 20px',
    background: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },

  resultBox: {
    marginTop: 20,
    padding: 24,
    background: 'white',
    borderRadius: 16,
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
  },
  addressBlock: {
    borderLeft: '4px solid #059669',
    paddingLeft: 16,
    marginBottom: 16,
  },
  street: {
    fontSize: 24,
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 4px 0',
    lineHeight: 1.2,
  },
  neighbourhood: {
    fontSize: 18,
    color: '#059669',
    fontWeight: 600,
    margin: '4px 0',
  },
  city: {
    fontSize: 15,
    color: '#6b7280',
    margin: 0,
  },
  coordinates: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: '#9ca3af',
    background: '#f3f4f6',
    padding: 8,
    borderRadius: 6,
    marginTop: 12,
  },
  timestamp: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 8,
  },
  actions: {
    display: 'flex',
    gap: 12,
    marginTop: 20,
  },
  whatsappBtn: {
    flex: 1,
    padding: 16,
    background: '#25d366',
    color: 'white',
    border: 'none',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
  },
  copyBtn: {
    flex: 1,
    padding: 16,
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
  },
}