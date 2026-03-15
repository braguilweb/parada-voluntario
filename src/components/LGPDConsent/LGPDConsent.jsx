// ============================================
// COMPONENTE: LGPDConsent
// RESPONSABILIDADE: Tela de consentimento de privacidade
// ============================================

import { APP_CONFIG } from '../../constants'

// Props que este componente recebe:
// - onAccept: função chamada quando usuário clica "Aceitar"
// - onBack: função chamada quando usuário clica voltar
export function LGPDConsent({ onAccept, onBack }) {
  
  // Dados dos avisos de privacidade (simplicidade)
  const privacyItems = [
    {
      icon: '📍',
      title: 'GPS',
      description: 'Localização usada apenas para registrar onde você está'
    },
    {
      icon: '💾',
      title: 'Dados Locais',
      description: 'Tudo fica no seu celular, nada enviado a servidores'
    },
    {
      icon: '🗑️',
      title: 'Auto-limpeza',
      description: `Histórico apaga automaticamente em ${APP_CONFIG.dataRetentionDays} dias`
    },
    {
      icon: '📤',
      title: 'Você Controla',
      description: 'Compartilha apenas quando e com quem quer'
    },
    {
      icon: '🔐',
      title: 'Sem Senha',
      description: 'Não pedimos email, telefone ou dados pessoais'
    }
  ]

  return (
    <div style={styles.container}>
      {/* Header com botão voltar */}
      <div style={styles.header}>
        <button 
          onClick={onBack}
          style={styles.backButton}
        >
          ← Voltar
        </button>
      </div>

      {/* Conteúdo Principal */}
      <div style={styles.content}>
        <div style={styles.titleSection}>
          <span style={styles.icon}>🔒</span>
          <h1 style={styles.title}>Sua Privacidade</h1>
          <p style={styles.subtitle}>Como protegemos seus dados</p>
        </div>

        {/* Lista de privacidade */}
        <ul style={styles.list}>
          {privacyItems.map((item, index) => (
            <li key={index} style={styles.listItem}>
              <div style={styles.itemIcon}>{item.icon}</div>
              <div style={styles.itemContent}>
                <strong style={styles.itemTitle}>{item.title}</strong>
                <p style={styles.itemDescription}>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Aviso LGPD */}
        <p style={styles.lgpdNote}>
          ℹ️ Conforme a LGPD, você pode parar a qualquer momento
        </p>
      </div>

      {/* Botão de Aceitar */}
      <div style={styles.footer}>
        <button 
          onClick={onAccept}
          style={styles.button}
        >
          ✅ Aceitar e Continuar
        </button>
      </div>
    </div>
  )
}

// ============================================
// ESTILOS (CSS-in-JS)
// ============================================

const styles = {
  container: {
    /* minHeight: '100vh', */
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column'
  },
  
  header: {
    paddingTop: '12px',
    paddingBottom: '16px',
    display: 'flex',
    alignItems: 'center'
  },

  backButton: {
    background: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'background 0.2s'
  },

  content: {
    flex: 1,
    maxWidth: '480px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%'
  },

  titleSection: {
    textAlign: 'center',
    marginBottom: '28px',
    paddingTop: '20px'
  },

  icon: {
    fontSize: '48px',
    display: 'block',
    marginBottom: '12px'
  },

  title: {
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 8px 0'
  },

  subtitle: {
    fontSize: '14px',
    margin: '0',
    opacity: 0.95
  },

  list: {
    margin: '0',
    padding: '0',
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px'
  },

  listItem: {
    alignItems: 'flex-start',
    gap: '12px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.15)'
  },

  itemIcon: {
    fontSize: '20px',
    flexShrink: 0,
    marginTop: '2px'
  },

  itemContent: {
    flex: 1
  },

  itemTitle: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '2px'
  },

  itemDescription: {
    fontSize: '12px',
    margin: '0',
    opacity: 0.95,
    lineHeight: 1.4
  },

  lgpdNote: {
    fontSize: '12px',
    textAlign: 'center',
    margin: '16px 0',
    padding: '12px',
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '8px',
    opacity: 0.9
  },

  footer: {
    paddingBottom: '20px'
  },

  button: {
    width: '100%',
    maxWidth: '300px',
    padding: '14px 24px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    background: 'white',
    color: '#059669',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  }
}

// Dica: Para hover funcionar bem, você pode usar 
// um arquivo CSS separado depois, ou bibliotecas como styled-components