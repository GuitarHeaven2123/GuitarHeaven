// ============================================================
// Mapeo de dónde comprar por marca y categoría
// Genera links reales de búsqueda en tiendas online y físicas
// ============================================================

// Tiendas online con sus URLs de búsqueda
const ONLINE_STORES = {
  mercadolibre: {
    name: 'Mercado Libre',
    emoji: '🛍️',
    color: '#ffe600',
    textColor: '#333',
    buildUrl: (query) =>
      `https://www.mercadolibre.com.mx/search?q=${encodeURIComponent(query)}`,
  },
  amazon: {
    name: 'Amazon México',
    emoji: '📦',
    color: '#ff9900',
    textColor: '#fff',
    buildUrl: (query) =>
      `https://www.amazon.com.mx/s?k=${encodeURIComponent(query)}`,
  },
  musicstoreusa: {
    name: 'Music Store USA',
    emoji: '🎵',
    color: '#c0392b',
    textColor: '#fff',
    buildUrl: (query) =>
      `https://www.musicstoreusa.com/catalogsearch/result/?q=${encodeURIComponent(query)}`,
  },
  sweetwater: {
    name: 'Sweetwater',
    emoji: '🎸',
    color: '#1a73e8',
    textColor: '#fff',
    buildUrl: (query) =>
      `https://www.sweetwater.com/store/search.php?s=${encodeURIComponent(query)}`,
  },
  guitarcenter: {
    name: 'Guitar Center',
    emoji: '🎵',
    color: '#d32f2f',
    textColor: '#fff',
    buildUrl: (query) =>
      `https://www.guitarcenter.com/search?q=${encodeURIComponent(query)}`,
  },
  walmart: {
    name: 'Walmart México',
    emoji: '🏪',
    color: '#0071ce',
    textColor: '#fff',
    buildUrl: (query) =>
      `https://www.walmart.com.mx/search?q=${encodeURIComponent(query)}`,
  },
  liverpool: {
    name: 'Liverpool',
    emoji: '🛒',
    color: '#d4002a',
    textColor: '#fff',
    buildUrl: (query) =>
      `https://www.liverpool.com.mx/tienda/search?query=${encodeURIComponent(query)}`,
  },
  ebay: {
    name: 'eBay',
    emoji: '🛒',
    color: '#e53238',
    textColor: '#fff',
    buildUrl: (query) =>
      `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}`,
  },
};

// Tiendas físicas en Guadalajara por especialidad
const GDL_STORES_BY_TYPE = {
  guitarras: [
    { name: 'Casa de la Música', address: 'Av. Vallarta 1525, Col. Americana', phone: '33 3825-4411', zone: 'Americana' },
    { name: 'Tamsa Música', address: 'Blvd. Puerta de Hierro 5059, Zapopan', phone: '33 3122-9988', zone: 'Zapopan' },
    { name: 'Guitar Center GDL', address: 'Plaza Galerías, Av. Vallarta 3959', phone: '33 3122-4500', zone: 'Zapopan' },
    { name: 'Cuerdas y Más', address: 'Calle Juan Álvarez 108, Tlaquepaque', phone: '33 3835-2244', zone: 'Tlaquepaque' },
  ],
  bajos: [
    { name: 'Bass Station GDL', address: 'Av. Colón 456, Guadalajara', phone: '33 3613-7788', zone: 'Centro' },
    { name: 'Casa de la Música', address: 'Av. Vallarta 1525, Col. Americana', phone: '33 3825-4411', zone: 'Americana' },
    { name: 'Guitar Center GDL', address: 'Plaza Galerías, Av. Vallarta 3959', phone: '33 3122-4500', zone: 'Zapopan' },
  ],
  pianos: [
    { name: 'Pianoforte', address: 'Av. México 2525, Guadalajara', phone: '33 3616-3344', zone: 'Ladrones' },
    { name: 'Tamsa Música', address: 'Blvd. Puerta de Hierro 5059, Zapopan', phone: '33 3122-9988', zone: 'Zapopan' },
    { name: 'Musicale', address: 'Av. Aviación 1900, Zapopan', phone: '33 3836-5500', zone: 'Ciudad Granja' },
  ],
  baterias: [
    { name: 'Percusión Total', address: 'Calle Pedro Moreno 1356, Guadalajara', phone: '33 3614-4477', zone: 'Centro' },
    { name: 'Tamsa Música', address: 'Blvd. Puerta de Hierro 5059, Zapopan', phone: '33 3122-9988', zone: 'Zapopan' },
    { name: 'Guitar Center GDL', address: 'Plaza Galerías, Av. Vallarta 3959', phone: '33 3122-4500', zone: 'Zapopan' },
  ],
  vientos: [
    { name: 'Martínez Instrumentos', address: 'Av. Hidalgo 1232, Centro Histórico', phone: '33 3614-7823', zone: 'Centro' },
    { name: 'El Palacio del Músico', address: 'Av. Chapultepec Norte 480, Guadalajara', phone: '33 3825-1133', zone: 'Moderna' },
    { name: 'Almacenes Pérez', address: 'Calle Independencia 320, Centro', phone: '33 3613-9900', zone: 'Centro' },
  ],
  cuerdas_clasicas: [
    { name: 'El Palacio del Músico', address: 'Av. Chapultepec Norte 480, Guadalajara', phone: '33 3825-1133', zone: 'Moderna' },
    { name: 'Almacenes Pérez', address: 'Calle Independencia 320, Centro', phone: '33 3613-9900', zone: 'Centro' },
    { name: 'Cuerdas y Más', address: 'Calle Juan Álvarez 108, Tlaquepaque', phone: '33 3835-2244', zone: 'Tlaquepaque' },
  ],
  amplificadores: [
    { name: 'Guitar Center GDL', address: 'Plaza Galerías, Av. Vallarta 3959', phone: '33 3122-4500', zone: 'Zapopan' },
    { name: 'Casa de la Música', address: 'Av. Vallarta 1525, Col. Americana', phone: '33 3825-4411', zone: 'Americana' },
    { name: 'Tamsa Música', address: 'Blvd. Puerta de Hierro 5059, Zapopan', phone: '33 3122-9988', zone: 'Zapopan' },
  ],
  audio_grabacion: [
    { name: 'Pro Audio GDL', address: 'Blvd. Marcelino García Barragán 849', phone: '33 3671-3300', zone: 'Oriente' },
    { name: 'Meridian Music Store', address: 'Av. Patria 1050, Zapopan', phone: '33 3836-7712', zone: 'Zapopan Norte' },
    { name: 'Guitar Center GDL', address: 'Plaza Galerías, Av. Vallarta 3959', phone: '33 3122-4500', zone: 'Zapopan' },
  ],
  dj: [
    { name: 'DJ Gear Guadalajara', address: 'Av. Niños Héroes 2425, Guadalajara', phone: '33 3122-6600', zone: 'Moderna' },
    { name: 'Meridian Music Store', address: 'Av. Patria 1050, Zapopan', phone: '33 3836-7712', zone: 'Zapopan Norte' },
  ],
  accesorios: [
    { name: 'Casa de la Música', address: 'Av. Vallarta 1525, Col. Americana', phone: '33 3825-4411', zone: 'Americana' },
    { name: 'Guitar Center GDL', address: 'Plaza Galerías, Av. Vallarta 3959', phone: '33 3122-4500', zone: 'Zapopan' },
    { name: 'Almacenes Pérez', address: 'Calle Independencia 320, Centro', phone: '33 3613-9900', zone: 'Centro' },
  ],
  general: [
    { name: 'Casa de la Música', address: 'Av. Vallarta 1525, Col. Americana', phone: '33 3825-4411', zone: 'Americana' },
    { name: 'Tamsa Música', address: 'Blvd. Puerta de Hierro 5059, Zapopan', phone: '33 3122-9988', zone: 'Zapopan' },
    { name: 'Guitar Center GDL', address: 'Plaza Galerías, Av. Vallarta 3959', phone: '33 3122-4500', zone: 'Zapopan' },
  ],
};

// Mapeo de categoría → tiendas físicas
function getPhysicalStores(category) {
  const c = category.toLowerCase();
  if (c.includes('guitarra') && !c.includes('bajo')) return GDL_STORES_BY_TYPE.guitarras;
  if (c.includes('bajo')) return GDL_STORES_BY_TYPE.bajos;
  if (c.includes('piano') || c.includes('teclado') || c.includes('sintetizador') || c.includes('órgano') || c.includes('controlador midi')) return GDL_STORES_BY_TYPE.pianos;
  if (c.includes('batería') || c.includes('percusión') || c.includes('platillos')) return GDL_STORES_BY_TYPE.baterias;
  if (c.includes('saxofón') || c.includes('trompeta') || c.includes('flauta') || c.includes('clarinete') || c.includes('trombón') || c.includes('tuba') || c.includes('armónica') || c.includes('viento')) return GDL_STORES_BY_TYPE.vientos;
  if (c.includes('violín') || c.includes('cello') || c.includes('contrabajo') || c.includes('ukulele') || c.includes('mandolina') || c.includes('banjo')) return GDL_STORES_BY_TYPE.cuerdas_clasicas;
  if (c.includes('amplificador')) return GDL_STORES_BY_TYPE.amplificadores;
  if (c.includes('micrófono') || c.includes('interfaz') || c.includes('audífono') || c.includes('monitor') || c.includes('grabadora') || c.includes('daw')) return GDL_STORES_BY_TYPE.audio_grabacion;
  if (c.includes('dj') || c.includes('controlador dj')) return GDL_STORES_BY_TYPE.dj;
  if (c.includes('cuerdas') || c.includes('pedal') || c.includes('pedalera') || c.includes('estuche') || c.includes('soporte') || c.includes('cable') || c.includes('púas') || c.includes('correa') || c.includes('afinador') || c.includes('pastillas') || c.includes('pedalboard')) return GDL_STORES_BY_TYPE.accesorios;
  return GDL_STORES_BY_TYPE.general;
}

// Mapeo de categoría → tiendas online
function getOnlineStores(product) {
  const c = product.category.toLowerCase();
  const query = `${product.brand} ${product.name}`;
  const shortQuery = product.name.length > 60 ? product.brand + ' ' + product.name.slice(0, 50) : query;

  // Siempre incluir MercadoLibre y Amazon México
  const stores = [
    { ...ONLINE_STORES.mercadolibre, url: ONLINE_STORES.mercadolibre.buildUrl(shortQuery) },
    { ...ONLINE_STORES.amazon, url: ONLINE_STORES.amazon.buildUrl(shortQuery) },
  ];

  // Guitarra, bajo, piano → Liverpool
  if (c.includes('guitarra') || c.includes('bajo') || c.includes('piano') || c.includes('batería') || c.includes('teclado')) {
    stores.push({ ...ONLINE_STORES.liverpool, url: ONLINE_STORES.liverpool.buildUrl(shortQuery) });
  }

  // Walmart para accesorios económicos (cuerdas, púas, cables)
  if (c.includes('cuerdas') || c.includes('púas') || c.includes('cable') || c.includes('afinador') || c.includes('correa') || c.includes('estuche')) {
    stores.push({ ...ONLINE_STORES.walmart, url: ONLINE_STORES.walmart.buildUrl(shortQuery) });
  }

  // Sweetwater para audio profesional, pedales, sintetizadores
  if (c.includes('micrófono') || c.includes('interfaz') || c.includes('audífono') || c.includes('monitor') || c.includes('pedal') || c.includes('pedalera') || c.includes('sintetizador') || c.includes('grabadora')) {
    stores.push({ ...ONLINE_STORES.sweetwater, url: ONLINE_STORES.sweetwater.buildUrl(shortQuery) });
  }

  // Guitar Center para guitarras, bajos, amplificadores
  if (c.includes('guitarra') || c.includes('bajo') || c.includes('amplificador') || c.includes('pedal') || c.includes('batería')) {
    stores.push({ ...ONLINE_STORES.guitarcenter, url: ONLINE_STORES.guitarcenter.buildUrl(shortQuery) });
  }

  // eBay para instrumentos vintage/raros
  if (product.price > 30000 || c.includes('violín') || c.includes('cello') || c.includes('contrabajo') || c.includes('sitar') || c.includes('laúd')) {
    stores.push({ ...ONLINE_STORES.ebay, url: ONLINE_STORES.ebay.buildUrl(shortQuery) });
  }

  return stores;
}

export function getWhereToBuy(product) {
  return {
    online: getOnlineStores(product),
    physical: getPhysicalStores(product.category),
  };
}
