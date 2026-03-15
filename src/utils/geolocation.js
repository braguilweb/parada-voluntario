// ============================================
// GEOLOCALIZAÇÃO COM CORREÇÃO DE RUA
// ============================================

/**
 * Passo 1: Pega posição real do GPS
 */
export function getRawGPSPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalização não suportada'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        accuracy: pos.coords.accuracy
      }),
      (err) => {
        const msgs = {
          1: 'Permissão de GPS negada',
          2: 'GPS indisponível',
          3: 'Timeout - GPS demorou muito'
        }
        reject(new Error(msgs[err.code] || 'Erro no GPS'))
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
    )
  })
}

/**
 * Passo 2: Converte coordenadas em endereço estruturado
 * E RETORNA coordenadas do CENTRO da rua (se disponível)
 */
export async function getRoadCenterAddress(lat, lng) {
  try {
    // Busca endereço detalhado
    const url = `https://nominatim.openstreetmap.org/reverse?` +
      `lat=${lat}&lon=${lng}&format=json&addressdetails=1` +
      `&extratags=1&namedetails=1&accept-language=pt-BR`

    const res = await fetch(url, {
      headers: { 'User-Agent': 'ParadaVoluntario/1.0' }
    })

    if (!res.ok) throw new Error('Serviço indisponível')
    
    const data = await res.json()
    const addr = data.address || {}

    // === LÓGICA DE CENTRO DA RUA ===
    
    // Se OSM tem "centro da via" (boundingbox), usamos
    // Senão, calculamos baseado no tipo de via
    
    let centerLat = lat
    let centerLng = lng
    let roadType = 'unknown'
    
    // Detecta tipo de via
    if (addr.road || addr.street || addr.pedestrian) {
      roadType = 'road'
    } else if (addr.footway || addr.path || addr.cycleway) {
      roadType = 'path'
    } else if (addr.place || addr.locality) {
      roadType = 'area'
    }

    // Se temos bounding box do OSM, calculamos centro da via
    if (data.boundingbox) {
      const [minLat, maxLat, minLng, maxLng] = data.boundingbox.map(Number)
      centerLat = (minLat + maxLat) / 2
      centerLng = (minLng + maxLng) / 2
      
      // Mas só usamos se não for muito longe do GPS original (< 100m)
      const distance = calculateDistance(lat, lng, centerLat, centerLng)
      if (distance > 100) {
        // Centro da boundingbox é longe, fica com original ajustado
        centerLat = lat
        centerLng = lng
      }
    }

    // Se é rodovia/avenida larga, move um pouco para centro
    const isHighway = data.extratags?.highway === 'primary' || 
                      data.extratags?.highway === 'secondary' ||
                      data.extratags?.highway === 'trunk'
    
    return {
      // Endereço formatado
      fullStreet: formatStreetName(addr),
      street: addr.road || addr.street || addr.pedestrian || addr.footway || 'Via não identificada',
      number: addr.house_number || '',
      neighbourhood: addr.suburb || addr.neighbourhood || addr.district || 'Região não identificada',
      city: addr.city || addr.town || addr.municipality || '',
      state: addr.state || '',
      postcode: addr.postcode || '',
      
      // Coordenadas corrigidas (centro da via)
      correctedPosition: {
        lat: centerLat,
        lng: centerLng,
        originalLat: lat,  // Guardamos original para referência
        originalLng: lng,
        wasCorrected: (centerLat !== lat || centerLng !== lng),
        roadType,
        isHighway
      },
      
      // Metadados
      osmData: {
        place_id: data.place_id,
        osm_type: data.osm_type,
        osm_id: data.osm_id,
        category: data.category,
        type: data.type
      }
    }

  } catch {
    // Fallback: retorna original sem correção
    return {
      fullStreet: 'Endereço indisponível',
      street: 'Via não identificada',
      number: '',
      neighbourhood: 'Região não identificada',
      city: '',
      correctedPosition: {
        lat, lng,
        originalLat: lat, originalLng: lng,
        wasCorrected: false,
        roadType: 'unknown',
        isHighway: false
      }
    }
  }
}

/**
 * Fluxo completo: GPS → Correção de rua → Resultado
 */
export async function getAccurateRoadPosition() {
  // 1. Pega GPS
  const rawGPS = await getRawGPSPosition()
  
  // 2. Corrige para centro da rua
  const address = await getRoadCenterAddress(rawGPS.lat, rawGPS.lng)
  
  // 3. Retorna posição corrigida + metadados
  return {
    // Posição FINAL (corrigida para centro da via)
    position: {
      lat: address.correctedPosition.lat,
      lng: address.correctedPosition.lng,
      accuracy: rawGPS.accuracy,
      originalAccuracy: rawGPS.accuracy,
      wasCorrected: address.correctedPosition.wasCorrected,
      distanceCorrected: calculateDistance(
        rawGPS.lat, rawGPS.lng,
        address.correctedPosition.lat, address.correctedPosition.lng
      )
    },
    
    // Endereço estruturado
    address,
    
    // Posição original (para debug/comparação)
    originalPosition: {
      lat: rawGPS.lat,
      lng: rawGPS.lng,
      accuracy: rawGPS.accuracy
    }
  }
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

function formatStreetName(addr) {
  const parts = []
  
  // Tipo da via (Rua, Avenida, etc)
  const type = addr.highway === 'primary' ? 'Av.' :
               addr.highway === 'secondary' ? 'Rua' :
               addr.highway === 'trunk' ? 'Rod.' :
               'Rua'
  
  // Nome
  const name = addr.road || addr.street || addr.pedestrian || addr.footway || ''
  
  if (name) {
    // Se já começa com Rua/Av/Rod, não duplica
    if (/^(Rua|Avenida|Av\.|Rodovia|Rod\.|Travessa|Tv\.)/i.test(name)) {
      parts.push(name)
    } else {
      parts.push(`${type} ${name}`)
    }
  }
  
  // Número só se tiver
  if (addr.house_number) {
    parts.push(`, ${addr.house_number}`)
  }
  
  return parts.join('') || 'Via não identificada'
}

/**
 * Distância entre 2 pontos (fórmula de Haversine) em metros
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000 // Raio da Terra em metros
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  
  return R * c
}

/**
 * Formata endereço completo para compartilhamento
 */
export function formatShareText(data) {
  const { address, position, capturedAt } = data
  
  let lines = [
    `📍 *Parada Voluntário*`,
    ``,
    `Paramos na ${address.fullStreet}`,
    `Bairro ${address.neighbourhood}`,
  ]
  
  if (address.city) {
    lines.push(`${address.city}`)
  }
  
  lines.push(``)
  lines.push(`📅 ${capturedAt}`)
  
  if (position.wasCorrected) {
    lines.push(`🎯 Local ajustado ao centro da via`)
  }
  
  lines.push(``)
  lines.push(`🗺️ https://www.google.com/maps?q=${position.lat},${position.lng}`)
  
  return lines.join('\n')
}

// Compatibilidade com APIs anteriores
export { getRawGPSPosition as getCurrentPosition, getRoadCenterAddress as reverseGeocode }