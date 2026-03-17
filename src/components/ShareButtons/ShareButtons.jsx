// src/components/ShareButtons/ShareButtons.jsx
import { useState } from 'react';
import { shareLocation, copyCoordinates } from '../../utils/share';
import { ShareModal } from './ShareModal';

// SVG Icons
const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

const CopyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
  </svg>
);

export function ShareButtons({ position, userName, address = {}, shareImage = null }) {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCopy = async () => {
    const success = await copyCoordinates(position);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmShare = async (customNote) => {
    setIsModalOpen(false);
    
    // Usa a imagem pré-gerada se disponível
    await shareLocation(position, userName, address, customNote, shareImage);
  };

  return (
    <div style={styles.container}>
      <button 
        onClick={handleShareClick}
        disabled={!position}
        style={{ ...styles.button, ...styles.share }}
      >
        <ShareIcon />
        Compartilhar
      </button>

      <ShareModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmShare}
        userName={userName}
      />
      
      <button 
        onClick={handleCopy}
        disabled={!position}
        style={{ 
          ...styles.button, 
          ...styles.copy,
          ...(copied ? styles.copied : {})
        }}
      >
        <CopyIcon />
        {copied ? 'Copiado!' : 'Copiar'}
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    gap: '12px',
    marginTop: '20px'
  },
  button: {
    flex: 1,
    padding: '12px 16px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    minHeight: '44px',
  },
  share: {
    background: '#059669',
    color: 'white',
    ':hover': {
      background: '#047857'
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