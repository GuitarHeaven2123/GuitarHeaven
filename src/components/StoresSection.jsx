import { useState } from 'react';
import { storesGDL } from '../data/stores.js';
import { ChevronDown, ChevronUp, Clock3, Globe, Map, MapPin, Phone, Search, Store, X } from 'lucide-react';

const zones = ['Todas', ...new Set(storesGDL.map(s => s.zone))];

function StarRow({ rating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s} className={`star ${s <= Math.floor(rating) ? 'filled' : ''}`}>★</span>
      ))}
      <span className="rating-num">{rating}</span>
    </div>
  );
}

export default function StoresSection() {
  const [selectedZone, setSelectedZone] = useState('Todas');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  const filtered = storesGDL.filter(store => {
    const matchZone = selectedZone === 'Todas' || store.zone === selectedZone;
    const q = search.toLowerCase();
    const matchSearch = !search || store.name.toLowerCase().includes(q) ||
      store.specialties.some(s => s.toLowerCase().includes(q)) ||
      store.tags.some(t => t.toLowerCase().includes(q));
    return matchZone && matchSearch;
  });

  return (
    <section className="stores-section">
      <div className="section-header">
        <h2 className="section-title"><MapPin size={24} /> Tiendas en Guadalajara</h2>
        <p className="section-subtitle">Encuentra las mejores tiendas de música en la zona metropolitana de GDL</p>
      </div>

      {/* Map placeholder */}
      <div className="map-banner">
        <span className="map-icon"><Map size={40} /></span>
        <div>
          <strong>Guadalajara & Área Metropolitana</strong>
          <p>Zapopan · Tlaquepaque · Tonalá · Centro GDL</p>
        </div>
        <span className="stores-count">{storesGDL.length} tiendas</span>
      </div>

      {/* Filters */}
      <div className="stores-controls">
        <div className="search-bar">
          <span className="search-icon"><Search size={18} /></span>
          <input
            type="text"
            placeholder="Buscar tienda o especialidad..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
          {search && <button className="search-clear" onClick={() => setSearch('')} aria-label="Limpiar búsqueda"><X size={16} /></button>}
        </div>

        <div className="zone-chips">
          {zones.map(zone => (
            <button
              key={zone}
              className={`chip ${selectedZone === zone ? 'active' : ''}`}
              onClick={() => setSelectedZone(zone)}
            >
              {zone === 'Todas' ? <><MapPin size={15} /> Todas las zonas</> : <><MapPin size={15} /> {zone}</>}
            </button>
          ))}
        </div>
      </div>

      {/* Stores list */}
      <div className="stores-grid">
        {filtered.map(store => (
          <div
            key={store.id}
            className={`store-card ${expanded === store.id ? 'expanded' : ''}`}
          >
            <div className="store-header" onClick={() => setExpanded(expanded === store.id ? null : store.id)}>
              <div className="store-icon"><Store size={40} /></div>
              <div className="store-basic">
                <h3 className="store-name">{store.name}</h3>
                <span className="store-zone"><MapPin size={14} /> {store.zone}</span>
                <StarRow rating={store.rating} />
                <span className="store-reviews-count">({store.reviews} reseñas)</span>
              </div>
              <div className="store-toggle">{expanded === store.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</div>
            </div>

            {expanded === store.id && (
              <div className="store-details">
                <p className="store-description">{store.description}</p>

                <div className="store-info-grid">
                  <div className="info-item">
                    <span className="info-icon"><MapPin size={18} /></span>
                    <div>
                      <strong>Dirección</strong>
                      <p>{store.address}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="info-icon"><Phone size={18} /></span>
                    <div>
                      <strong>Teléfono</strong>
                      <p>{store.phone}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="info-icon"><Clock3 size={18} /></span>
                    <div>
                      <strong>Horario</strong>
                      <p>{store.schedule}</p>
                    </div>
                  </div>
                  {store.website && (
                    <div className="info-item">
                      <span className="info-icon"><Globe size={18} /></span>
                      <div>
                        <strong>Sitio Web</strong>
                        <p>
                          <a href={store.website} target="_blank" rel="noreferrer" className="store-link">
                            {store.website.replace('https://', '')}
                          </a>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="store-specialties">
                  <strong>Especialidades:</strong>
                  <div className="specialty-chips">
                    {store.specialties.map(s => (
                      <span key={s} className="specialty-chip">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="store-tags">
                  {store.tags.map(t => (
                    <span key={t} className="tag-chip">#{t}</span>
                  ))}
                </div>

                <div className="store-actions">
                  <a
                    href={store.googleMaps}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-maps"
                  >
                    <Map size={16} /> Ver en Google Maps
                  </a>
                  {store.website && (
                    <a
                      href={store.website}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-website"
                    >
                      <Globe size={16} /> Visitar Sitio Web
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="no-results">
          <span className="no-results-icon"><Store size={48} /></span>
          <p>No se encontraron tiendas con tu búsqueda.</p>
          <button className="btn-secondary" onClick={() => { setSearch(''); setSelectedZone('Todas'); }}>
            Ver todas las tiendas
          </button>
        </div>
      )}
    </section>
  );
}
