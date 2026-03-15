// src/components/ShareButtons/ShareButtons.jsx
import { useState } from 'react';
import { shareLocation, copyCoordinates } from '../../utils/share';

export function ShareButtons({ position, userName }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyCoordinates(position);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={styles.container}>
      <button 
        onClick={() => shareLocation(position, userName)}
        disabled={!position}
        style={{ ...styles.button, ...styles.whatsapp }}
      >
        📱 Compartilhar
      </button>
      
      <button 
        onClick={handleCopy}
        disabled={!position}
        style={{ 
          ...styles.button, 
          ...styles.copy,
          ...(copied ? styles.copied : {})
        }}
      >
        {copied ? '✅ Copiado!' : '📋 Copiar'}
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    gap: '12px',
    marginTop: '16px'
  },
  button: {
    flex: 1,
    padding: '14px 20px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    disabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  },
  whatsapp: {
    background: '#25d366',
    color: 'white',
    ':hover': {
      background: '#128c7e'
    }
  },
  copy: {
    background: '#f3f4f6',
    color: '#374151',
    border: '2px solid #e5e7eb'
  },
  copied: {
    background: '#d1fae5',
    borderColor: '#059669',
    color: '#065f46'
  }
};