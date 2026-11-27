import { useState } from 'react';
import { X } from 'lucide-react';
import AppIcon from './AppIcon.jsx';

function StarRating({ rating }) {
  return (
    <div className="star-rating" aria-label={`${rating} de 5`}>
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          className={`star ${star <= Math.floor(rating) ? 'filled' : star - 0.5 <= rating ? 'half' : ''}`}
        >
          ★
        </span>
      ))}
      <span className="rating-num">{rating}</span>
    </div>
  );
}

export default function ProductCard({ product, onAddToCart }) {
  const [showDetail, setShowDetail] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.offer
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  return (
    <>
      <div className={`product-card ${product.offer ? 'on-offer' : ''}`}>
        {product.offer && (
          <div className="offer-badge">-{discount}% OFF</div>
        )}

        <div className="product-emoji">
          <AppIcon category={product.category} size={42} />
        </div>

        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h3 className="product-name">{product.name}</h3>
          <span className="product-brand">{product.brand}</span>

          <StarRating rating={product.rating} />
          <span className="product-reviews">({product.reviews} reseñas)</span>

          <div className="product-price-block">
            {product.offer ? (
              <>
                <span className="price-original">${product.price.toLocaleString('es-MX')}</span>
                <span className="price-offer">${product.offerPrice.toLocaleString('es-MX')}</span>
              </>
            ) : (
              <span className="price-regular">${product.price.toLocaleString('es-MX')}</span>
            )}
            <span className="currency">MXN</span>
          </div>
        </div>

        <div className="product-actions">
          <button className="btn-detail" onClick={() => setShowDetail(true)}>
            Ver detalles
          </button>
          <button
            className={`btn-cart ${added ? 'added' : ''}`}
            onClick={handleAdd}
          >
            {added ? '✓ Agregado' : '🛒 Agregar'}
          </button>
        </div>
      </div>

      {showDetail && (
        <div className="modal-overlay" onClick={() => setShowDetail(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowDetail(false)} aria-label="Cerrar"><X size={18} /></button>
            <div className="modal-emoji"><AppIcon category={product.category} size={58} /></div>
            <span className="product-category">{product.category}</span>
            <h2>{product.name}</h2>
            <p className="modal-brand"><strong>Marca:</strong> {product.brand}</p>
            <StarRating rating={product.rating} />
            <p className="modal-reviews">{product.reviews} reseñas</p>
            <p className="modal-description">{product.description}</p>
            <div className="product-price-block large">
              {product.offer ? (
                <>
                  <span className="price-original">${product.price.toLocaleString('es-MX')}</span>
                  <span className="price-offer">${product.offerPrice.toLocaleString('es-MX')}</span>
                  <span className="offer-save">Ahorras ${(product.price - product.offerPrice).toLocaleString('es-MX')}</span>
                </>
              ) : (
                <span className="price-regular">${product.price.toLocaleString('es-MX')}</span>
              )}
              <span className="currency"> MXN</span>
            </div>
            <button
              className={`btn-cart full-width ${added ? 'added' : ''}`}
              onClick={handleAdd}
            >
              {added ? '✓ Agregado al carrito' : '🛒 Agregar al carrito'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

