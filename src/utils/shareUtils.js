// src/utils/shareUtils.js

/**
 * Compartilha via Web Share API (mobile) ou fallback para WhatsApp Web
 */
export const shareLocation = async (position, userName) => {
  if (!position) {
    alert('Localização não disponível');
    return;
  }

  const { lat, lng } = position;
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
  
  const shareData = {
    title: 'Parada Voluntária',
    text: `🙋 ${userName} está em trabalho voluntário!\n\n📍 Localização:\nhttps://www.google.com/maps?q=${lat},${lng}\n\n🕐 ${new Date().toLocaleString('pt-BR')}`,
    url: mapsUrl
  };

  // Tenta Web Share API primeiro (funciona em apps instalados/mobile)
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return { success: true, method: 'native' };
    } catch (err) {
      // Usuário cancelou ou erro
      if (err.name !== 'AbortError') {
        console.error('Erro no share:', err);
      }
    }
  }

  // Fallback: WhatsApp Web
  const whatsappText = encodeURIComponent(shareData.text);
  const whatsappUrl = `https://wa.me/?text=${whatsappText}`;
  
  window.open(whatsappUrl, '_blank');
  return { success: true, method: 'whatsapp' };
};

/**
 * Copia coordenadas para área de transferência
 */
export const copyCoordinates = async (position) => {
  if (!position) return { success: false, error: 'Sem posição' };

  const text = `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`;
  
  try {
    await navigator.clipboard.writeText(text);
    return { success: true, text };
  } catch (err) {
    // Fallback para execCommand (browsers antigos)
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return { success: true, text, fallback: true };
  }
};

/**
 * Gera imagem do mapa usando html2canvas (para próxima fase)
 */
export const captureMap = async (mapElement) => {
  // Implementaremos na fase 2 do MVP
  console.log('Captura de tela será implementada com html2canvas');
  return null;
};