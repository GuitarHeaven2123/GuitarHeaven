import { useState } from 'react';
import { getWhereToBuy } from '../data/buyLinks.js';

function WhereToBuy({ product }) {
  const [open, setOpen] = useState(false);
  const { online, physical } = getWhereToBuy(product);

  return (
    <div className="where-to-buy">
      <button
        className="wtb-toggle"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        🔍 ¿Dónde comprarlo? {open ? '▲' : '▼'}
      </button>

      {open && (
        <div className="wtb-panel">
          {/* Online */}
          <div className="wtb-section">
            <span className="wtb-section-title">🌐 En línea</span>
            <div className="wtb-links">
              {online.map(store => (
                <a
                  key={store.name}
                  href={store.url}
                  target="_blank"
                  rel="noreferrer"
                  className="wtb-link"
                  style={{ background: store.color, color: store.textColor }}
                >
                  <span>{store.emoji}</span>
                  <span>{store.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Physical */}
          <div className="wtb-section">
            <span className="wtb-section-title">📍 Tiendas físicas en GDL</span>
            <div className="wtb-physical">
              {physical.map(store => (
                <div key={store.name} className="wtb-store">
                  <div className="wtb-store-name">🏪 {store.name}</div>
                  <div className="wtb-store-addr">📌 {store.address}</div>
                  <div className="wtb-store-phone">📞 {store.phone}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Cart({ items, onRemove, onClose, onClearCart }) {
  const total = items.reduce((sum, item) => {
    return sum + (item.offer ? item.offerPrice : item.price) * item.qty;
  }, 0);

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h3>🛒 Tu carrito</h3>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">🎸</span>
            <p>Tu carrito está vacío</p>
            <small>Agrega instrumentos para verlos aquí</small>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-top">
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-brand">{item.brand}</span>
                      <div className="cart-item-price-row">
                        <span className="cart-item-price">
                          ${(item.offer ? item.offerPrice : item.price).toLocaleString('es-MX')} MXN
                        </span>
                        <span className="cart-item-qty">× {item.qty}</span>
                        {item.offer && (
                          <span className="cart-item-offer-tag">OFERTA</span>
                        )}
                      </div>
                    </div>
                    <button className="cart-remove" onClick={() => onRemove(item.id)}>✕</button>
                  </div>

                  <WhereToBuy product={item} />
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total estimado:</span>
                <strong>${total.toLocaleString('es-MX')} MXN</strong>
              </div>
              <div className="cart-note">
                💡 Los precios son orientativos. Verifica disponibilidad en cada tienda.
              </div>
              <button className="btn-clear-cart" onClick={onClearCart}>
                🗑️ Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
