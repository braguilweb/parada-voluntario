import { useState } from 'react'
import { Welcome } from './components/Welcome/Welcome'
import { LGPDConsent } from './components/LGPDConsent/LGPDConsent'
import { UserSetup } from './components/UserSetup/UserSetup'
import { LocationFinder } from './components/LocationFinder/LocationFinder'
import { STORAGE_KEYS } from './constants'

export default function App() {
  // Estados
  const [hasStarted, setHasStarted] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.hasStarted) === 'true'
  })
  
  const [hasConsent, setHasConsent] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.lgpdConsent) === 'true'
  })
  
  const [userName, setUserName] = useState(() => {        // Carrega nome do usuário do localStorage, ou vazio se não existir
    return localStorage.getItem(STORAGE_KEYS.userName) || ''    // Carrega nome do usuário do localStorage, ou vazio se não existir
  })

  // Handlers
  const handleEnterApp = () => {
    localStorage.setItem(STORAGE_KEYS.hasStarted, 'true')
    setHasStarted(true)
  }

  const handleBackFromLGPD = () => {
    setHasStarted(false)
  }

  const handleAcceptLGPD = () => {
    localStorage.setItem(STORAGE_KEYS.lgpdConsent, 'true')
    setHasConsent(true)
  }

  const handleSetName = (name) => {
    localStorage.setItem(STORAGE_KEYS.userName, name)
    setUserName(name)
  }

  // Fluxo de telas
  if (!hasStarted) {
    return <Welcome onEnter={handleEnterApp} />
  }

  if (!hasConsent) {
    return <LGPDConsent onAccept={handleAcceptLGPD} onBack={handleBackFromLGPD} />
  }

  if (!userName) {
    return <UserSetup onComplete={handleSetName} />
  }

  // App principal
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={styles.header}>
        <h1 style={styles.title}>📍 Parei Aqui</h1>
        <div style={styles.user}>
          <span>👤 {userName}</span>
          <button 
            onClick={() => {
              localStorage.clear()
              window.location.reload()
            }}
            style={styles.logout}
          >
            Sair
          </button>         
        </div>
      </header>

      <main style={styles.main}>
        <LocationFinder />
      </main>
    </div>
  )
}

const styles = {
  header: {
    background: '#059669',
    color: 'white',
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    margin: 0,
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontSize: 14,
  },
  logout: {
    padding: '6px 12px',
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    fontSize: 12,
    cursor: 'pointer',
  },
  main: {
    maxWidth: 480,
    margin: '0 auto',
    padding: 20,
  },
}