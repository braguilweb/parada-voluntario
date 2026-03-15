// src/hooks/useGeoLocation.js
import { useState, useEffect, useCallback } from 'react'; // Importa useCallback para memoizar a função de atualização da localização

// HOOK CUSTOMIZADO: useGeoLocation
// Responsabilidade: Gerenciar estado de localização geográfica, incluindo posição, erros e status de carregamento.

export const useGeoLocation = () => {                       // Estado para armazenar a posição geográfica
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const getLocation = useCallback(() => {                 // Função para obter a localização, memoizada para evitar recriações desnecessárias
        setLoading(true);
        setError(null);

        if (!navigator.geolocation) {           // Verifica se a API de geolocalização é suportada pelo navegador
            setError('Geolocalização não é suportada pelo seu navegador.');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(           // Solicita a posição atual do usuário
            (position) => {
                setPosition({
                    lat: position.coords.latitude,          // Armazena latitude, longitude e precisão da posição
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy
                });
                setLoading(false);
            },
            (error) => {
               let errorMessage = 'Erro ao obter localização.';
               switch (error.code) {
                   case error.PERMISSION_DENIED:
                       errorMessage = 'Permissão de localização negada. Habilite no navegador.';
                       break;
                   case error.POSITION_UNAVAILABLE:
                       errorMessage = 'Informação de localização indisponível.';
                       break;
                   case error.TIMEOUT:
                       errorMessage = 'Tempo esgotado ao buscar localização.';
                       break;
                     default:
                       errorMessage = 'Erro desconhecido ao obter localização.';

               }
               setError(errorMessage);
               setLoading(false);
            },
            { 
                enableHighAccuracy: true, // Tenta usar GPS para melhor precisão
                timeout: 30000,           // 30 segundos
                maximumAge: 0 }           // Não usa cache, sempre busca nova posição  

        );
    }, []);

    // Pega localização ao montar o componente
    useEffect(() => {
        getLocation();
    }, [getLocation]);

    return { position, error, loading, refresh: getLocation };
};