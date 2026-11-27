import { useState } from 'react';
import { Home, Guitar, Tag, Music, MapPin, Star, Target, X, Menu } from 'lucide-react';

const navLinks = [
  { id: 'home', label: 'Inicio', icon: Home },
  { id: 'catalog', label: 'Catálogo', icon: Guitar },
  { id: 'offers', label: 'Ofertas', icon: Tag },
  { id: 'accessories', label: 'Accesorios', icon: Music },
  { id: 'stores', label: 'Tiendas GDL', icon: MapPin },
  { id: 'reviews', label: 'Reseñas', icon: Star },
  { id: 'quiz', label: 'Quiz', icon: Target },
];

export default function Navbar({ activeSection, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
        <span className="brand-icon"><Guitar size={28} aria-hidden="true" /></span>
        <span className="brand-text">GuitarHeaven</span>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <li key={link.id}>
            <button
              className={`nav-btn ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => { onNavigate(link.id); setMenuOpen(false); }}
            >
              <link.icon size={17} aria-hidden="true" />
              <span>{link.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
