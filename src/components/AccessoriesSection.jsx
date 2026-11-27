import { useState } from 'react';
import { strings, pedals, accessories, recording } from '../data/instruments.js';
import ProductCard from './ProductCard.jsx';
import AppIcon from './AppIcon.jsx';
import { Search, X, Music } from 'lucide-react';

const accessoryGroups = [
  {
    id: 'strings',
    label: 'Cuerdas',
    icon: 'Cuerdas',
    description: 'Cuerdas para guitarra eléctrica, acústica, clásica y bajo',
    data: strings,
    color: '#f97316',
  },
  {
    id: 'pedals',
    label: 'Pedales & Efectos',
    icon: 'Pedal',
    description: 'Distorsión, overdrive, delay, reverb, modulación y más',
    data: pedals,
    color: '#8b5cf6',
  },
  {
    id: 'accessories',
    label: 'Accesorios de Guitarra',
    icon: 'Guitarra',
    description: 'Cables, estuches, soportes, púas, correas y afinadores',
    data: accessories,
    color: '#10b981',
  },
  {
    id: 'recording',
    label: 'Grabación & Audio',
    icon: 'Micrófono',
    description: 'Micrófonos, interfaces de audio, audífonos y grabadoras',
    data: recording,
    color: '#3b82f6',
  },
];

export default function AccessoriesSection({ onAddToCart }) {
  const [activeGroup, setActiveGroup] = useState('strings');
  const [search, setSearch] = useState('');

  const currentGroup = accessoryGroups.find(g => g.id === activeGroup);
  const filtered = currentGroup.data.filter(p => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <section className="accessories-section">
      <div className="section-header">
        <h2 className="section-title"><Music size={24} /> Accesorios</h2>
        <p className="section-subtitle">Todo lo que necesitas para complementar tu instrumento</p>
      </div>

      {/* Group tabs */}
      <div className="acc-tabs">
        {accessoryGroups.map(group => (
          <button
            key={group.id}
            className={`acc-tab ${activeGroup === group.id ? 'active' : ''}`}
            style={{ '--tab-color': group.color }}
            onClick={() => { setActiveGroup(group.id); setSearch(''); }}
          >
            <span className="tab-emoji"><AppIcon category={group.icon} size={26} /></span>
            <span className="tab-label">{group.label}</span>
            <span className="tab-count">{group.data.length}</span>
          </button>
        ))}
      </div>

      {/* Group info */}
      <div className="acc-group-info" style={{ borderColor: currentGroup.color }}>
        <div className="group-emoji"><AppIcon category={currentGroup.icon} size={36} /></div>
        <div>
          <h3>{currentGroup.label}</h3>
          <p>{currentGroup.description}</p>
          <span className="items-count">{currentGroup.data.length} productos disponibles</span>
        </div>
      </div>

      {/* Search within group */}
      <div className="search-bar narrow">
        <span className="search-icon"><Search size={18} /></span>
        <input
          type="text"
          placeholder={`Buscar en ${currentGroup.label}...`}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch('')} aria-label="Limpiar búsqueda"><X size={16} /></button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="no-results">
          <span className="no-results-icon"><Search size={48} /></span>
          <p>No se encontraron accesorios para "{search}"</p>
          <button className="btn-secondary" onClick={() => setSearch('')}>Ver todos</button>
        </div>
      ) : (
        <div className="products-grid">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </section>
  );
}
