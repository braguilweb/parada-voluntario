// src/utils/share.js

export const shareLocation = async (position, userName) => {
  if (!position) {
    alert('Localização não disponível');
    return;
  }

  const { lat, lng } = position;
  const text = `🙋 ${userName} em trabalho voluntário!\n\n📍 https://maps.google.com/?q=${lat},${lng}\n\n🕐 ${new Date().toLocaleString('pt-BR')}`;

  // Tenta Web Share API (mobile)
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Parada Voluntário',
        text: text,
        url: `https://maps.google.com/?q=${lat},${lng}`
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