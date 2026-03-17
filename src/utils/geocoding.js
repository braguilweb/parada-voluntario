// src/utils/geocoding.js
// Re-exporta a função principal de geocodificação e correção de rua
// para centralizar a lógica e evitar duplicação.
// Agora, getAddressFromCoords irá usar a lógica mais completa de geolocation.js.
export { getAccurateRoadPosition as getAddressFromCoords } from './geolocation';
