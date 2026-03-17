// src/utils/share.js

const APP_URL = 'https://parei-aqui.vercel.app/';

// Formata a data e hora em português
const formatDateTime = () => {
  const now = new Date();
  const options = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  const formatted = now.toLocaleDateString('pt-BR', options);
  // Transforma a primeira letra em maiúscula
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const shareLocation = async (position, userName, address = {}, customNote = '', imageFile = null) => {
  if (!position) {
    alert('Localização não disponível');
    return;
  }

  const { lat, lng } = position;
  
  // Constrói a mensagem refinada
  const header = `😊 Compartilhando minha localização com App Parei Aqui\n\n`;
  const user = `👤 ${userName}\n`;
  const street = `📍 ${address.street || 'Rua não identificada'}, ${address.neighborhood || 'Bairro não identificado'}\n`;
  const city = `   ${address.city || ''}${address.state ? ', ' + address.state : ''}\n`;
  const zip = address.postcode ? `   CEP: ${address.postcode}\n` : '';
  
  const dateTime = `\n🕐 ${formatDateTime()}\n\n`;
  
  const note = customNote ? `📝 Motivo: ${customNote}\n\n` : '';
  
  const mapsLink = `Link com as coordenadas:\nhttps://www.google.com/maps?q=${lat},${lng}\n\n`;
  
  const footer = `Gostou dessa mensagem? Baixe o app Parei Aqui\n${APP_URL}`;

  const text = `${header}${user}${street}${city}${zip}${dateTime}${note}${mapsLink}${footer}`;

  // Tenta Web Share API (mobile)
  if (navigator.share) {
    try {
      const shareData = {
        title: 'Parei Aqui',
        text: text,
      };

      // Adiciona o arquivo de imagem se existir e o navegador suportar
      if (imageFile && navigator.canShare && navigator.canShare({ files: [imageFile] })) {
        shareData.files = [imageFile];
      }

      await navigator.share(shareData);
      return;
    } catch (err) {
      if (err.name !== 'AbortError') console.error('Share failed:', err);
    }
  }

  // Fallback: WhatsApp Web (apenas texto)
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