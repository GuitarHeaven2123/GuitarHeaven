import { useState } from 'react';

const navLinks = [
  { id: 'home', label: '🏠 Inicio' },
  { id: 'catalog', label: '🎸 Catálogo' },
  { id: 'offers', label: '🔥 Ofertas' },
  { id: 'accessories', label: '🎵 Accesorios' },
  { id: 'stores', label: '📍 Tiendas GDL' },
  { id: 'reviews', label: '⭐ Reseñas' },
  { id: 'quiz', label: '🎯 Quiz' },
];

export default function Navbar({ activeSection, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
        <span className="brand-icon">🎸</span>
        <span className="brand-text">GuitarHeaven</span>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <li key={link.id}>
            <button
              className={`nav-btn ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => { onNavigate(link.id); setMenuOpen(false); }}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
