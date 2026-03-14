// ============================================
// APP PRINCIPAL
// ORQUESTRA: LGPD → Nome → Mapa
// ============================================

import { useState, useEffect } from 'react'
import { LGPDConsent } from './components/LGPDConsent/LGPDConsent'
import { useLGPDConsent } from './hooks/useLocalStorage'
import { STORAGE_KEYS } from './constants'

export default function App() {
  // ===== ESTADOS GLOBAIS =====
  
  // LGPD - vem do hook personalizado
  const { hasConsent, giveConsent } = useLGPDConsent()
  
  // Nome do usuário (próxima entrega, mas já preparando)
  const [userName, setUserName] = useState('')
  const [tempName, setTempName] = useState('')
  
  // Carrega nome salvo ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.userName)
    if (saved) setUserName(saved)
  }, [])

  // ===== RENDERIZAÇÃO CONDICIONAL =====
  
  // 1. Se não aceitou LGPD → mostra tela de consentimento
  if (!hasConsent) {
    return <LGPDConsent onAccept={giveConsent} />
  }

  // 2. Se não tem nome → tela de cadastro de nome
  // (vamos fazer na Entrega 3, por agora um placeholder)
  if (!userName) {
    return (
      <div style={placeholderStyles.container}>
        <div style={placeholderStyles.card}>
          <h1>👤 Configurar Nome</h1>
          <p>(Próxima entrega: tela completa de cadastro)</p>
          <input 
            value={tempName}
            onChange={e => setTempName(e.target.value)}
            placeholder="Seu nome"
            style={placeholderStyles.input}
          />
          <button 
            onClick={() => {
              if (tempName.trim()) {
                localStorage.setItem(STORAGE_KEYS.userName, tempName.trim())
                setUserName(tempName.trim())
              }
            }}
            style={placeholderStyles.button}
          >
            Salvar
          </button>
        </div>
      </div>
    )
  }

  // 3. App principal (vamos construir nas próximas entregas)
  return (
    <div style={mainStyles.container}>
      <h1>🎉 Parabéns, {userName}!</h1>
      <p>LGPD aceito ✅ | Nome configurado ✅</p>
      <p>Próxima entrega: Mapa com geolocalização 🗺️</p>
      
      <button 
        onClick={() => {
          // Debug: limpar tudo
          localStorage.clear()
          window.location.reload()
        }}
        style={mainStyles.resetButton}
      >
        🔄 Resetar tudo (teste)
      </button>
    </div>
  )
}

// Estilos temporários (vamos organizar melhor depois)
const placeholderStyles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    background: '#f5f5f5',
  },
  card: {
    background: 'white',
    padding: 32,
    borderRadius: 16,
    textAlign: 'center',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: 12,
    margin: '16px 0',
    fontSize: 16,
    borderRadius: 8,
    border: '1px solid #ddd',
  },
  button: {
    padding: '12px 24px',
    background: '#059669',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    fontSize: 16,
    cursor: 'pointer',
  }
}

const mainStyles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    background: '#f5f5f5',
    textAlign: 'center',
  },
  resetButton: {
    marginTop: 20,
    padding: '10px 20px',
    background: '#fee2e2',
    color: '#dc2626',
    border: '1px solid #fecaca',
    borderRadius: 8,
    cursor: 'pointer',
  }
}