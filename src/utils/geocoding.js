// src/utils/geocoding.js
export const getAddressFromCoords = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching address:', error);
    throw error;
  }
}
