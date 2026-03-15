import { useState, useEffect, useCallback } from 'react';

export const useGeolocation = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLocation = useCallback(() => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocalização não suportada');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy
        });
        setLoading(false);
      },
      (err) => {
        const errors = {
          1: 'Permissão negada. Habilite no navegador.',
          2: 'Localização indisponível.',
          3: 'Tempo esgotado.'
        };
        setError(errors[err.code] || 'Erro desconhecido');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  useEffect(() => {
    // Defer the initial GPS request to avoid triggering synchronous state updates during render.
    const timer = setTimeout(getLocation, 0);
    return () => clearTimeout(timer);
  }, [getLocation]);

  return { position, error, loading, refresh: getLocation };
};