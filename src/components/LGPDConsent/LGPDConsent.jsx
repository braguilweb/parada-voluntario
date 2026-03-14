// ============================================
// COMPONENTE: LGPDConsent
// RESPONSABILIDADE: Tela de consentimento de privacidade
// ============================================

import { APP_CONFIG } from '../../constants'

// Props que este componente recebe:
// - onAccept: função chamada quando usuário clica "Aceitar"
export function LGPDConsent({ onAccept }) {
  
  // Dados dos avisos de privacidade (array = fácil de manter)
  const privacyItems = [
    {
      icon: '📍',
      title: 'GPS ativo',
      description: 'Usamos sua localização apenas para marcar onde parou'
    },
    {
      icon: '💾',
      title: 'Dados locais',
      description: 'Tudo fica no seu celular, não enviamos para servidor'
    },
    {
      icon: '🗑️',
      title: 'Auto-exclusão',
      description: `Histórico apaga automaticamente após ${APP_CONFIG.dataRetentionDays} dias`
    },
    {
      icon: '📤',
      title: 'Compartilhamento manual',
      description: 'Você escolhe quando e com quem compartilhar'
    },
    {
      icon: '🔐',
      title: 'Sem login',
      description: 'Não pedimos email, telefone ou senha'
    }
  ]

  return (
    // Container centralizado com fundo gradiente
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* Ícone e título */}
        <div style={styles.header}>
          <span style={styles.lockIcon}>🔒</span>
          <h1 style={styles.title}>Sua Privacidade é Importante</h1>
        </div>

        {/* Introdução */}
        <p style={styles.intro}>
          <strong>Antes de começar, precisamos que você saiba:</strong>
        </p>

        {/* Lista de itens de privacidade */}
        <ul style={styles.list}>
          {privacyItems.map((item, index) => (
            // Cada item é um <li> com key única (obrigatório no React)
            <li key={index} style={styles.listItem}>
              <span style={styles.itemIcon}>{item.icon}</span>
              <div style={styles.itemContent}>
                <strong style={styles.itemTitle}>{item.title}:</strong>
                <span style={styles.itemDescription}> {item.description}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* Aviso LGPD */}
        <p style={styles.footer}>
          Conforme a <strong>LGPD</strong>, você pode parar de usar a qualquer momento.
        </p>

        {/* Botão de ação */}
        <button 
          onClick={onAccept}
          style={styles.button}
        >
          ✅ Entendi e Aceito Usar
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
    // Ocupa toda a tela
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    // Fundo gradiente verde
    background: `linear-gradient(135deg, ${APP_CONFIG.colors.primary} 0%, ${APP_CONFIG.colors.primaryDark} 100%)`,
  },
  
  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '32px',
    maxWidth: '420px',
    width: '100%',
    // Sombra elegante
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
  },
  
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  
  lockIcon: {
    fontSize: '48px',
    display: 'block',
    marginBottom: '12px',
  },
  
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: APP_CONFIG.colors.text,
    margin: 0,
  },
  
  intro: {
    color: '#374151',
    lineHeight: 1.6,
    fontSize: '15px',
    marginBottom: '16px',
  },
  
  list: {
    margin: '16px 0',
    padding: 0,
    listStyle: 'none', // Remove bullets padrão
  },
  
  listItem: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '14px',
    lineHeight: 1.5,
  },
  
  itemIcon: {
    fontSize: '20px',
    marginRight: '12px',
    flexShrink: 0, // Não deixa ícone encolher
  },
  
  itemContent: {
    flex: 1,
  },
  
  itemTitle: {
    color: APP_CONFIG.colors.text,
  },
  
  itemDescription: {
    color: '#4b5563',
  },
  
  footer: {
    fontSize: '13px',
    color: APP_CONFIG.colors.textMuted,
    marginTop: '16px',
    textAlign: 'center',
  },
  
  button: {
    width: '100%',
    padding: '16px',
    background: APP_CONFIG.colors.primary,
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '20px',
    // Efeito hover via CSS-in-JS não é direto, 
    // mas podemos adicionar transição
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
}

// Dica: Para hover funcionar bem, você pode usar 
// um arquivo CSS separado depois, ou bibliotecas como styled-components