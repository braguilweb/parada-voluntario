// ============================================
// HOOK CUSTOMIZADO: useLocalStorage
// RESPONSABILIDADE: Sincronizar estado React com localStorage
// ============================================

import { useState, useEffect } from 'react'

// Hook genérico - pode usar em QUALQUER lugar do app
export function useLocalStorage(key, initialValue) {
  
  // Estado inicial: tenta ler do localStorage, senão usa initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Erro ao ler localStorage [${key}]:`, error)
      return initialValue
    }
  })

  // Sempre que mudar, salva no localStorage
  const setValue = (value) => {
    try {
      // Permite value ser função (igual setState do React)
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Erro ao salvar localStorage [${key}]:`, error)
    }
  }

  return [storedValue, setValue]
}

// ============================================
// HOOK ESPECÍFICO: useLGPDConsent
// Mais simples de usar no componente
// ============================================

import { STORAGE_KEYS } from '../constants'

export function useLGPDConsent() {
  const [consent, setConsent] = useLocalStorage(STORAGE_KEYS.lgpdConsent, false)
  
  const giveConsent = () => setConsent(true)
  const revokeConsent = () => setConsent(false)
  
  return {
    hasConsent: consent,
    giveConsent,
    revokeConsent
  }
}