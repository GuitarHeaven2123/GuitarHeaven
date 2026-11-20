import { useState } from 'react';
import { userReviews } from '../data/reviews.js';

function StarRow({ rating, interactive = false, onRate }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map(s => (
        <span
          key={s}
          className={`star ${s <= (interactive ? (hover || rating) : Math.floor(rating)) ? 'filled' : ''}`}
          style={{ cursor: interactive ? 'pointer' : 'default', fontSize: interactive ? '1.6rem' : undefined }}
          onMouseEnter={() => interactive && setHover(s)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onRate && onRate(s)}
        >
          ★
        </span>
      ))}
      {!interactive && <span className="rating-num">{rating}</span>}
    </div>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(userReviews);
  const [sortBy, setSortBy] = useState('recent');
  const [filterRating, setFilterRating] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [helpful, setHelpful] = useState({});

  // Form state
  const [form, setForm] = useState({
    user: '',
    productName: '',
    rating: 0,
    title: '',
    comment: '',
    tags: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const sorted = [...reviews]
    .filter(r => filterRating === 0 || r.rating === filterRating)
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'helpful') return b.helpful - a.helpful;
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      if (sortBy === 'rating-asc') return a.rating - b.rating;
      return 0;
    });

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  const dist = [5, 4, 3, 2, 1].map(r => ({
    stars: r,
    count: reviews.filter(rev => rev.rating === r).length,
    pct: Math.round((reviews.filter(rev => rev.rating === r).length / reviews.length) * 100),
  }));

  const handleHelpful = (id) => {
    setHelpful(h => ({ ...h, [id]: true }));
    setReviews(r => r.map(rev => rev.id === id ? { ...rev, helpful: rev.helpful + 1 } : rev));
  };

  const validate = () => {
    const e = {};
    if (!form.user.trim()) e.user = 'Ingresa tu nombre';
    if (!form.productName.trim()) e.productName = 'Ingresa el producto';
    if (!form.rating) e.rating = 'Selecciona una calificación';
    if (!form.title.trim()) e.title = 'Escribe un título';
    if (form.comment.trim().length < 20) e.comment = 'El comentario debe tener al menos 20 caracteres';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }

    const newReview = {
      id: Date.now(),
      user: form.user,
      avatar: form.user.slice(0, 2).toUpperCase(),
      productName: form.productName,
      rating: form.rating,
      date: new Date().toISOString().split('T')[0],
      title: form.title,
      comment: form.comment,
      helpful: 0,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    setReviews(r => [newReview, ...r]);
    setForm({ user: '', productName: '', rating: 0, title: '', comment: '', tags: '' });
    setFormErrors({});
    setSubmitted(true);
    setShowForm(false);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="reviews-section">
      <div className="section-header">
        <h2 className="section-title">⭐ Reseñas de la Comunidad</h2>
        <p className="section-subtitle">Lo que dicen los músicos sobre sus instrumentos favoritos</p>
      </div>

      {submitted && (
        <div className="success-banner">
          ✅ ¡Tu reseña fue publicada exitosamente! Gracias por compartir tu experiencia.
        </div>
      )}

      {/* Summary */}
      <div className="reviews-summary">
        <div className="avg-rating-block">
          <span className="avg-number">{avgRating}</span>
          <StarRow rating={parseFloat(avgRating)} />
          <span className="total-reviews">{reviews.length} reseñas totales</span>
        </div>
        <div className="rating-distribution">
          {dist.map(d => (
            <div key={d.stars} className="dist-row">
              <span>{d.stars} ★</span>
              <div className="dist-bar-bg">
                <div className="dist-bar-fill" style={{ width: `${d.pct}%` }} />
              </div>
              <span>{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="controls-row reviews-controls">
        <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="recent">Más recientes</option>
          <option value="helpful">Más útiles</option>
          <option value="rating-desc">Mayor calificación</option>
          <option value="rating-asc">Menor calificación</option>
        </select>

        <div className="rating-filter">
          <span>Filtrar: </span>
          {[0, 5, 4, 3, 2, 1].map(r => (
            <button
              key={r}
              className={`rating-filter-btn ${filterRating === r ? 'active' : ''}`}
              onClick={() => setFilterRating(r)}
            >
              {r === 0 ? 'Todas' : `${r}★`}
            </button>
          ))}
        </div>

        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancelar' : '✏️ Escribir reseña'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form className="review-form" onSubmit={handleSubmit} noValidate>
          <h3>Escribe tu reseña</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Tu nombre *</label>
              <input
                type="text"
                placeholder="Ej: Carlos M."
                value={form.user}
                onChange={e => setForm(f => ({ ...f, user: e.target.value }))}
                className={formErrors.user ? 'error' : ''}
              />
              {formErrors.user && <span className="field-error">{formErrors.user}</span>}
            </div>
            <div className="form-group">
              <label>Producto *</label>
              <input
                type="text"
                placeholder="Ej: Fender Stratocaster"
                value={form.productName}
                onChange={e => setForm(f => ({ ...f, productName: e.target.value }))}
                className={formErrors.productName ? 'error' : ''}
              />
              {formErrors.productName && <span className="field-error">{formErrors.productName}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Calificación *</label>
            <StarRow rating={form.rating} interactive onRate={r => setForm(f => ({ ...f, rating: r }))} />
            {formErrors.rating && <span className="field-error">{formErrors.rating}</span>}
          </div>

          <div className="form-group">
            <label>Título *</label>
            <input
              type="text"
              placeholder="Resumen de tu experiencia"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className={formErrors.title ? 'error' : ''}
            />
            {formErrors.title && <span className="field-error">{formErrors.title}</span>}
          </div>

          <div className="form-group">
            <label>Comentario * <small>({form.comment.length}/500)</small></label>
            <textarea
              rows={5}
              placeholder="Cuéntanos tu experiencia detallada con el instrumento o accesorio..."
              value={form.comment}
              onChange={e => setForm(f => ({ ...f, comment: e.target.value.slice(0, 500) }))}
              className={formErrors.comment ? 'error' : ''}
            />
            {formErrors.comment && <span className="field-error">{formErrors.comment}</span>}
          </div>

          <div className="form-group">
            <label>Etiquetas (separadas por coma)</label>
            <input
              type="text"
              placeholder="Ej: Rock, Principiante, Metal"
              value={form.tags}
              onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
            />
          </div>

          <button type="submit" className="btn-primary">Publicar reseña</button>
        </form>
      )}

      {/* Reviews list */}
      <div className="reviews-list">
        {sorted.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div className="reviewer-avatar">{review.avatar}</div>
              <div className="reviewer-info">
                <strong>{review.user}</strong>
                <span className="review-date">{new Date(review.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <StarRow rating={review.rating} />
            </div>

            <div className="review-product">
              <span>🎸 {review.productName}</span>
            </div>

            <h4 className="review-title">"{review.title}"</h4>
            <p className="review-comment">{review.comment}</p>

            {review.tags && review.tags.length > 0 && (
              <div className="review-tags">
                {review.tags.map(tag => (
                  <span key={tag} className="tag-chip">#{tag}</span>
                ))}
              </div>
            )}

            <div className="review-footer">
              <span className="helpful-count">👍 {review.helpful} personas encontraron esto útil</span>
              <button
                className={`btn-helpful ${helpful[review.id] ? 'voted' : ''}`}
                onClick={() => !helpful[review.id] && handleHelpful(review.id)}
                disabled={helpful[review.id]}
              >
                {helpful[review.id] ? '✓ Útil' : 'Fue útil'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="no-results">
          <p>No hay reseñas con {filterRating} estrella{filterRating !== 1 ? 's' : ''}.</p>
          <button className="btn-secondary" onClick={() => setFilterRating(0)}>Ver todas</button>
        </div>
      )}
    </section>
  );
}
