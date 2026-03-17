// ============================================
// COMPONENTE: UserSetup
// RESPONSABILIDADE: Capturar nome do usuário
// ============================================

import { useState } from 'react'
import { APP_CONFIG } from '../../constants'

// Props:
// - onComplete: função chamada com o nome digitado
// - currentName: nome já salvo (opcional, para edição)
export function UserSetup({ onComplete, currentName = '' }) {
  
  // Estados locais
  const [name, setName] = useState(currentName)
  const [error, setError] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleInitialSubmit = (e) => {
    e.preventDefault()
    
    const trimmed = name.trim()
    
    // Validação simples
    if (trimmed.length < 2) {
      setError('Digite pelo menos 2 letras')
      return
    }
    
    if (trimmed.length > 30) {
      setError('Nome muito longo (máx 30)')
      return
    }
    
    setError('')
    setShowConfirmation(true) // Mostra tela de confirmação
  }

  const handleConfirm = () => {
    onComplete(name.trim())
  }

  const handleEdit = () => {
    setShowConfirmation(false)
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* Ícone fixo no topo */}
        <div style={styles.icon}>👤</div>

        {!showConfirmation ? (
          <>
            <h1 style={styles.title}>Quem está registrando?</h1>
            
            <p style={styles.subtitle}>
              Digite seu nome para identificar os registros no histórico e compartilhamentos
            </p>

            <form onSubmit={handleInitialSubmit} style={styles.form}>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError('')
                }}
                placeholder="Seu primeiro nome"
                style={{
                  ...styles.input,
                  borderColor: error ? APP_CONFIG.colors.danger : '#e5e7eb'
                }}
                maxLength={30}
                autoFocus
              />
              
              {error && (
                <p style={styles.error}>{error}</p>
              )}

              <button 
                type="submit"
                disabled={!name.trim()}
                style={{
                  ...styles.button,
                  opacity: name.trim() ? 1 : 0.6,
                  cursor: name.trim() ? 'pointer' : 'not-allowed'
                }}
              >
                Continuar →
              </button>
            </form>
          </>
        ) : (
          <div style={styles.confirmationSection}>
            <h1 style={styles.title}>Confirme seu nome</h1>
            
            <p style={styles.confirmedName}>"{name.trim()}"</p>
            
            <p style={styles.subtitle}>
              Este nome aparecerá nos seus compartilhamentos de localização. Está CORRETO?
            </p>

            <div style={styles.buttonGroup}>
              <button 
                onClick={handleConfirm}
                style={styles.confirmButton}
              >
                Sim, está certo
              </button>
              
              <button 
                onClick={handleEdit}
                style={styles.editButton}
              >
                Corrigir
              </button>
            </div>
          </div>
        )}

        {/* Dica de privacidade */}
        <p style={styles.privacyNote}>
          🔒 Este nome fica apenas no seu aparelho
        </p>

      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    background: `linear-gradient(135deg, ${APP_CONFIG.colors.primary} 0%, ${APP_CONFIG.colors.primaryDark} 100%)`,
  },
  
  card: {
    background: 'white',
    borderRadius: 20,
    padding: 32,
    maxWidth: 380,
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
  },
  
  icon: {
    fontSize: 56,
    marginBottom: 16,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 8,
  },
  
  subtitle: {
    color: '#6b7280',
    fontSize: 15,
    lineHeight: 1.5,
    marginBottom: 24,
  },
  
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  
  input: {
    padding: 16,
    fontSize: 18,
    border: '2px solid #e5e7eb',
    borderRadius: 12,
    textAlign: 'center',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  
  error: {
    color: '#dc2626',
    fontSize: 13,
    margin: 0,
  },
  
  button: {
    padding: 16,
    background: APP_CONFIG.colors.primary,
    color: 'white',
    border: 'none',
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 600,
    transition: 'transform 0.1s',
  },
  
  privacyNote: {
    marginTop: 20,
    fontSize: 12,
    color: '#9ca3af',
  },

  /* Novos estilos para confirmação */
  confirmationSection: {
    animation: 'fadeIn 0.3s ease-out',
  },

  confirmedName: {
    fontSize: 32,
    fontWeight: 800,
    color: APP_CONFIG.colors.primary,
    margin: '12px 0',
  },

  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginTop: 16,
  },

  confirmButton: {
    padding: 16,
    background: APP_CONFIG.colors.primary,
    color: 'white',
    border: 'none',
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },

  editButton: {
    padding: 12,
    background: 'transparent',
    color: '#6b7280',
    border: '2px solid #e5e7eb',
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
}
