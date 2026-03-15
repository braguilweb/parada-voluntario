// src/components/ShareButtons/ShareButtons.jsx
import { useState } from 'react';
import { shareLocation, copyCoordinates } from '../../utils/shareUtils';
import './ShareButtons.css';

export const ShareButtons = ({ position, userName }) => {
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  const handleShare = async () => {
    setSharing(true);
    await shareLocation(position, userName);
    setSharing(false);
  };

  const handleCopy = async () => {
    const result = await copyCoordinates(position);
    if (result.success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isDisabled = !position;

  return (
    <div className="share-container">
      <h3 className="share-title">Compartilhar Localização</h3>
      
      <div className="share-buttons">
        <button 
          onClick={handleShare}
          disabled={isDisabled || sharing}
          className="btn btn-whatsapp"
        >
          {sharing ? 'Abrindo...' : '📱 Compartilhar'}
        </button>

        <button 
          onClick={handleCopy}
          disabled={isDisabled}
          className={`btn btn-copy ${copied ? 'copied' : ''}`}
        >
          {copied ? '✅ Copiado!' : '📋 Copiar Coordenadas'}
        </button>
      </div>

      {position && (
        <div className="coordinates-display">
          <small>
            📍 {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
          </small>
        </div>
      )}
    </div>
  );
};