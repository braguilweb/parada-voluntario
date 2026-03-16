// src/utils/share.js

const APP_URL = 'https://parei-aqui-guilherme-bragas-projects.vercel.app';

export const shareLocation = async (position, userName, address = {}) => {
  if (!position) {
    alert('Localização não disponível');
    return;
  }

  const { lat, lng } = position;
  const addressLine = address.street ? `${address.street}, ${address.neighborhood}` : 'Local registrado';
  const cityLine = address.city ? `${address.city}${address.state ? ', ' + address.state : ''}` : '';
  
  const text = `🙋 ${userName} em trabalho voluntário!\n\n📍 ${addressLine}\n${cityLine}\n\n🔗 https://maps.google.com/?q=${lat},${lng}\n\n🕐 ${new Date().toLocaleString('pt-BR')}\n\n👇 Baixe o app também:\n${APP_URL}`;

  // Tenta Web Share API (mobile)
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Parei Aqui',
        text: text,
        url: APP_URL
      });
      return;
    } catch (err) {
      if (err.name !== 'AbortError') console.error('Share failed:', err);
    }
  }

  // Fallback: WhatsApp Web
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
};

export const copyCoordinates = async (position) => {
  if (!position) return;
  
  const text = `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`;
  
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  }
};