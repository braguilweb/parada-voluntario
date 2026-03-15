// ============================================
// COMPONENTE: Welcome
// RESPONSABILIDADE: Landing page inicial
// ============================================

import { APP_CONFIG } from '../../constants'

// Props:
// - onEnter: função chamada quando usuário clica "Entrar"
export function Welcome({ onEnter }) {
  
  const features = [
    {
      icon: '🗺️',
      title: 'Localização Rápida',
      description: 'Capture sua posição com um clique'
    },
    {
      icon: '🤝',
      title: 'Compartilhe com Facilidade',
      description: 'Envie sua localização via WhatsApp ou Web Share'
    },
    {
      icon: '🔒',
      title: 'Privacidade Garantida',
      description: 'Seus dados ficam apenas no seu celular'
    },
    {
      icon: '📱',
      title: 'Sem Login Complexo',
      description: 'Apenas seu nome, nada mais'
    }
  ]

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.logo}>📍</div>
        <h1 style={styles.title}>Parei Aqui</h1>
        <p style={styles.subtitle}>
          Registre sua localização e compartilhe de forma simples e rápida
        </p>
      </div>

      {/* Features */}
      <div style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <div key={index} style={styles.featureCard}>
            <div style={styles.featureIcon}>{feature.icon}</div>
            <h3 style={styles.featureTitle}>{feature.title}</h3>
            <p style={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Como Funciona</h2>
        <ol style={styles.steps}>
          <li style={styles.step}>
            <span style={styles.stepNumber}>1</span>
            <span>Entrar e aceitar termo de privacidade</span>
          </li>
          <li style={styles.step}>
            <span style={styles.stepNumber}>2</span>
            <span>Digite seu nome para identificação</span>
          </li>
          <li style={styles.step}>
            <span style={styles.stepNumber}>3</span>
            <span>Acesse o mapa e registre sua localização</span>
          </li>
          <li style={styles.step}>
            <span style={styles.stepNumber}>4</span>
            <span>Compartilhe com quem precisar!</span>
          </li>
        </ol>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <button 
          onClick={onEnter}
          style={styles.button}
        >
          🚀 Entrar Agora
        </button>
        <p style={styles.disclaimer}>
          ✅ Aplicação LGPD-friendly • Sem servidor • Dados locais
        </p>
      </div>

      {/* Copyright & Developer Links */}
      <div style={styles.copyright}>
        <p style={styles.copyrightText}>
          © 2026 Parei Aqui. Todos os direitos reservados.
        </p>
        <div style={styles.developerLinks}>
          <a 
            href="https://wa.me/5522981611821" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.link}
          >
            💬 WhatsApp
          </a>
          <a 
            href="https://www.linkedin.com/in/guilherme-de-almeida-braga/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.link}
          >
            🔗 LinkedIn
          </a>
        </div>
        <p style={styles.developerNote}>
          Desenvolvido por Guilherme Braga
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    /* minHeight: '100vh', */
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  hero: {
    textAlign: 'center',
    paddingTop: '40px',
    paddingBottom: '40px'
  },
  logo: {
    fontSize: '64px',
    marginBottom: '16px',
    animation: 'bounce 2s infinite'
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    margin: '0 0 12px 0',
    letterSpacing: '-1px'
  },
  subtitle: {
    fontSize: '16px',
    margin: '0',
    opacity: 0.9,
    maxWidth: '300px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  featuresContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '32px',
    maxWidth: '480px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%'
  },
  featureCard: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  featureIcon: {
    fontSize: '28px',
    marginBottom: '8px'
  },
  featureTitle: {
    fontSize: '14px',
    fontWeight: '600',
    margin: '0 0 6px 0'
  },
  featureDescription: {
    fontSize: '12px',
    margin: '0',
    opacity: 1,
    lineHeight: 1.3
  },
  ctaSection: {
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    maxWidth: '480px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    backdropFilter: 'blur(10px)'
  },
  ctaTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 16px 0',
    opacity: 1
  },
  steps: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  step: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    fontSize: '14px',
    lineHeight: 1.4,
    opacity: 1
  },
  stepNumber: {
    background: 'rgba(255, 255, 255, 0.25)',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontWeight: '600',
    fontSize: '12px',
    opacity: 1
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    paddingBottom: '20px'
  },
  button: {
    width: '100%',
    maxWidth: '300px',
    padding: '14px 24px',
    background: 'white',
    color: '#059669',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  },
  disclaimer: {
    fontSize: '12px',
    opacity: 1,
    margin: '0',
    textAlign: 'center',
    color: '#047857',
    fontWeight: 500
  },
  copyright: {
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    paddingTop: '16px',
    paddingBottom: '12px',
    textAlign: 'center'
  },
  copyrightText: {
    fontSize: '11px',
    margin: '0 0 8px 0',
    opacity: 0.85
  },
  developerLinks: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    marginBottom: '8px'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '12px',
    padding: '6px 12px',
    borderRadius: '6px',
    background: 'rgba(255, 255, 255, 0.15)',
    transition: 'background 0.2s',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    fontWeight: 500
  },
  developerNote: {
    fontSize: '10px',
    margin: '0',
    opacity: 0.75
  }
}
