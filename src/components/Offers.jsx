import { useState, useMemo } from 'react';
import { allProductsFull as allProducts } from '../data/instruments.js';
import ProductCard from './ProductCard.jsx';

export default function Offers({ onAddToCart }) {
  const [sortBy, setSortBy] = useState('discount');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const offers = useMemo(() => {
    const o = allProducts
      .filter(p => p.offer)
      .map(p => ({
        ...p,
        discount: Math.round(((p.price - p.offerPrice) / p.price) * 100),
        savings: p.price - p.offerPrice,
      }));

    switch (sortBy) {
      case 'discount': return o.sort((a, b) => b.discount - a.discount);
      case 'savings': return o.sort((a, b) => b.savings - a.savings);
      case 'price-asc': return o.sort((a, b) => a.offerPrice - b.offerPrice);
      case 'price-desc': return o.sort((a, b) => b.offerPrice - a.offerPrice);
      default: return o;
    }
  }, [sortBy]);

  const totalSavings = offers.reduce((s, p) => s + p.savings, 0);
  const totalPages = Math.ceil(offers.length / ITEMS_PER_PAGE);
  const paged = offers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <section className="offers-section">
      <div className="section-header">
        <h2 className="section-title">🔥 Ofertas Especiales</h2>
        <p className="section-subtitle">
          {offers.length} productos en oferta — Ahorra hasta ${Math.max(...offers.map(p => p.savings)).toLocaleString('es-MX')} MXN
        </p>
      </div>

      {/* Stats banner */}
      <div className="offers-stats">
        <div className="offer-stat">
          <span className="offer-stat-value">{offers.length}</span>
          <span className="offer-stat-label">Productos en Oferta</span>
        </div>
        <div className="offer-stat">
          <span className="offer-stat-value">{Math.max(...offers.map(p => p.discount))}%</span>
          <span className="offer-stat-label">Mayor Descuento</span>
        </div>
        <div className="offer-stat">
          <span className="offer-stat-value">${totalSavings.toLocaleString('es-MX')}</span>
          <span className="offer-stat-label">Total en Ahorros</span>
        </div>
      </div>

      {/* Controls */}
      <div className="controls-row">
        <label>Ordenar por: </label>
        <select className="sort-select" value={sortBy} onChange={e => { setSortBy(e.target.value); setPage(1); }}>
          <option value="discount">Mayor descuento</option>
          <option value="savings">Mayor ahorro</option>
          <option value="price-asc">Precio más bajo</option>
          <option value="price-desc">Precio más alto</option>
        </select>
      </div>

      {/* Top 3 highlight */}
      <div className="top-offers">
        <h3 className="subsection-title">⚡ Top 3 Mejores Descuentos</h3>
        <div className="top-offers-grid">
          {offers.slice(0, 3).map((product, i) => (
            <div key={product.id} className={`top-offer-card rank-${i + 1}`}>
              <div className="rank-badge">{['🥇', '🥈', '🥉'][i]}</div>
              <div className="top-offer-emoji">{getEmoji(product.category)}</div>
              <div className="top-offer-info">
                <span className="product-category">{product.category}</span>
                <h4>{product.name}</h4>
                <div className="top-offer-prices">
                  <span className="price-original">${product.price.toLocaleString('es-MX')}</span>
                  <span className="price-offer">${product.offerPrice.toLocaleString('es-MX')}</span>
                </div>
                <span className="discount-pill">-{product.discount}%</span>
              </div>
              <button className="btn-cart" onClick={() => onAddToCart(product)}>🛒 Agregar</button>
            </div>
          ))}
        </div>
      </div>

      {/* Full offers grid */}
      <h3 className="subsection-title">Todas las ofertas</h3>
      <div className="products-grid">
        {paged.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="page-btn">‹</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`page-btn ${page === i + 1 ? 'active' : ''}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="page-btn">›</button>
        </div>
      )}
    </section>
  );
}

function getEmoji(category) {
  if (category.includes('Guitarra') || category.includes('Bajo')) return '🎸';
  if (category.includes('Piano') || category.includes('Teclado') || category.includes('Sintetizador')) return '🎹';
  if (category.includes('Batería') || category.includes('Percusión') || category.includes('Platillos')) return '🥁';
  if (category.includes('Saxofón') || category.includes('Clarinete')) return '🎷';
  if (category.includes('Trompeta') || category.includes('Trombón')) return '🎺';
  if (category.includes('Flauta')) return '🪈';
  if (category.includes('Violín') || category.includes('Cello') || category.includes('Contrabajo')) return '🎻';
  if (category.includes('Micrófono')) return '🎤';
  if (category.includes('Audífono')) return '🎧';
  if (category.includes('Pedal') || category.includes('Pedalera')) return '🎚️';
  if (category.includes('Amplificador')) return '🔊';
  return '🎵';
}
