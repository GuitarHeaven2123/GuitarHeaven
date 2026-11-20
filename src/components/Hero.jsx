import { allProductsFull } from '../data/instruments.js';

export default function Hero({ onNavigate }) {
  const stats = [
    { value: `${allProductsFull.length}+`, label: 'Productos' },
    { value: '50+', label: 'Marcas' },
    { value: '15', label: 'Tiendas GDL' },
    { value: '100+', label: 'Categorías' },
  ];

  return (
    <section className="hero-section">
      <div className="hero-bg-shapes">
        <div className="shape shape1" />
        <div className="shape shape2" />
        <div className="shape shape3" />
      </div>

      <div className="hero-content">
        <div className="hero-badge">🎵 El mayor catálogo musical de Jalisco</div>
        <h1 className="hero-title">
          Tu universo musical<br />
          <span className="gradient-text">comienza aquí</span>
        </h1>
        <p className="hero-subtitle">
          Más de 1,000 instrumentos, accesorios y equipos. Comparar precios, leer reseñas,
          encontrar tiendas en Guadalajara y descubrir qué instrumento es para ti.
        </p>

        <div className="hero-cta">
          <button className="btn-primary" onClick={() => onNavigate('catalog')}>
            🎸 Explorar Catálogo
          </button>
          <button className="btn-secondary" onClick={() => onNavigate('quiz')}>
            🎯 ¿Qué instrumento soy?
          </button>
        </div>

        <div className="hero-stats">
          {stats.map(s => (
            <div key={s.label} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-instruments">
        {['🎸', '🎹', '🥁', '🎺', '🎻', '🎷', '🎵', '🪗', '🪘', '🎤'].map((emoji, i) => (
          <div
            key={i}
            className="floating-instrument"
            style={{
              animationDelay: `${i * 0.3}s`,
              left: `${5 + i * 9}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>
    </section>
  );
}
