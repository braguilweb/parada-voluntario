// src/components/ShareButtons/ShareModal.jsx
import { useState } from 'react';

export function ShareModal({ isOpen, onClose, onConfirm }) {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleConfirm = (useDefault) => {
    onConfirm(useDefault ? '' : note);
    setIsCustomizing(false);
    setNote('');
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Compartilhar Localização</h2>
        <p style={styles.subtitle}>Como deseja enviar sua localização?</p>

        {!isCustomizing ? (
          <div style={styles.buttonGroup}>
            <button 
              onClick={() => handleConfirm(true)}
              style={{ ...styles.button, ...styles.primary }}
            >
              🚀 Usar Padrão
            </button>
            <button 
              onClick={() => setIsCustomizing(true)}
              style={{ ...styles.button, ...styles.secondary }}
            >
              📝 Personalizar
            </button>
          </div>
        ) : (
          <div style={styles.customSection}>
            <label style={styles.label}>Motivo opcional:</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ex: Cheguei no local, Parei para almoçar..."
              style={styles.textarea}
              autoFocus
            />
            <div style={styles.buttonGroup}>
              <button 
                onClick={() => handleConfirm(false)}
                style={{ ...styles.button, ...styles.primary }}
              >
                Enviar com Motivo
              </button>
              <button 
                onClick={() => setIsCustomizing(false)}
                style={{ ...styles.button, ...styles.textLink }}
              >
                Voltar
              </button>
            </div>
          </div>
        )}

        <button onClick={onClose} style={styles.closeButton}>Cancelar</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '20px',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    width: '100%',
    maxWidth: '360px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    textAlign: 'center',
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '24px',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  button: {
    padding: '14px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    transition: 'opacity 0.2s',
  },
  primary: {
    backgroundColor: '#059669',
    color: 'white',
  },
  secondary: {
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '1px solid #e5e7eb',
  },
  textLink: {
    backgroundColor: 'transparent',
    color: '#6b7280',
    fontSize: '14px',
  },
  closeButton: {
    marginTop: '16px',
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  customSection: {
    textAlign: 'left',
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px',
  },
  textarea: {
    width: '100%',
    height: '80px',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    fontFamily: 'inherit',
    marginBottom: '16px',
    resize: 'none',
    outline: 'none',
    focus: {
      borderColor: '#059669',
    }
  }
};
