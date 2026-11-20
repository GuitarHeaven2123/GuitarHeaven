import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Catalog from './components/Catalog.jsx';
import Offers from './components/Offers.jsx';
import AccessoriesSection from './components/AccessoriesSection.jsx';
import StoresSection from './components/StoresSection.jsx';
import ReviewsSection from './components/ReviewsSection.jsx';
import Quiz from './components/Quiz.jsx';
import Cart from './components/Cart.jsx';

export default function App() {
  const [section, setSection] = useState('home');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const navigate = (s) => {
    setSection(s);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const clearCart = () => setCart([]);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="app">
      <Navbar activeSection={section} onNavigate={navigate} />

      {/* Cart FAB */}
      <button
        className={`cart-fab ${totalItems > 0 ? 'has-items' : ''}`}
        onClick={() => setCartOpen(true)}
        aria-label="Abrir carrito"
      >
        🛒
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </button>

      {cartOpen && (
        <Cart
          items={cart}
          onRemove={removeFromCart}
          onClose={() => setCartOpen(false)}
          onClearCart={clearCart}
        />
      )}

      <main className="main-content">
        {section === 'home' && <Hero onNavigate={navigate} />}
        {section === 'catalog' && <Catalog onAddToCart={addToCart} />}
        {section === 'offers' && <Offers onAddToCart={addToCart} />}
        {section === 'accessories' && <AccessoriesSection onAddToCart={addToCart} />}
        {section === 'stores' && <StoresSection />}
        {section === 'reviews' && <ReviewsSection />}
        {section === 'quiz' && <Quiz onNavigate={navigate} />}
      </main>

      <footer className="app-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="brand-icon">🎸</span>
            <strong>GuitarHeaven</strong>
            <p>El mayor catálogo musical de Jalisco</p>
          </div>
          <div className="footer-links">
            <strong>Secciones</strong>
            {[
              ['catalog', '🎸 Catálogo'],
              ['offers', '🔥 Ofertas'],
              ['accessories', '🎵 Accesorios'],
              ['stores', '📍 Tiendas GDL'],
              ['reviews', '⭐ Reseñas'],
              ['quiz', '🎯 Quiz'],
            ].map(([id, label]) => (
              <button key={id} className="footer-link" onClick={() => navigate(id)}>{label}</button>
            ))}
          </div>
          <div className="footer-info">
            <strong>Información</strong>
            <p>📍 Guadalajara, Jalisco, México</p>
            <p>🎵 1,000+ productos catalogados</p>
            <p>🏪 15 tiendas físicas listadas</p>
            <p>⭐ Reseñas verificadas</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 GuitarHeaven · Todos los precios son orientativos en MXN · Para comprar visita las tiendas físicas</p>
        </div>
      </footer>
    </div>
  );
}
