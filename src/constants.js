// ============================================
// CONFIGURAÇÕES DO APP
// ============================================

export const APP_CONFIG = {
  // Nome exibido no app
  name: 'Parei Aqui',
  
  // Tempo de retenção de dados (dias)
  dataRetentionDays: 30,
  
  // Raio do círculo no mapa (metros)
  mapAccuracyRadius: 50,
  
  // Cores do tema
  colors: {
    primary: '#059669',      // Verde principal
    primaryDark: '#047857',  // Verde escuro
    danger: '#dc2626',       // Vermelho (erros)
    warning: '#f59e0b',      // Laranja (avisos)
    text: '#111827',         // Texto principal
    textMuted: '#6b7280',   // Texto secundário
  }
}

// Chaves usadas no localStorage
export const STORAGE_KEYS = {
  lgpdConsent: 'lgpd-consent',
  userName: 'user-name',
  history: 'paradas-history',
}