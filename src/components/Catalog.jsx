import { useState, useMemo } from 'react';
import { allProductsFull as allProducts, categories } from '../data/instruments.js';
import ProductCard from './ProductCard.jsx';
import { ChevronDown, ChevronUp, Search, SlidersHorizontal, X } from 'lucide-react';

const ITEMS_PER_PAGE = 24;

const sortOptions = [
  { value: 'name', label: 'Nombre A-Z' },
  { value: 'name-desc', label: 'Nombre Z-A' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'rating', label: 'Mejor calificación' },
  { value: 'reviews', label: 'Más reseñas' },
];

export default function Catalog({ onAddToCart }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...allProducts];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'Todos') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (priceMin !== '') {
      result = result.filter(p => (p.offer ? p.offerPrice : p.price) >= Number(priceMin));
    }
    if (priceMax !== '') {
      result = result.filter(p => (p.offer ? p.offerPrice : p.price) <= Number(priceMax));
    }

    result.sort((a, b) => {
      const pa = a.offer ? a.offerPrice : a.price;
      const pb = b.offer ? b.offerPrice : b.price;
      switch (sortBy) {
        case 'price-asc': return pa - pb;
        case 'price-desc': return pb - pa;
        case 'rating': return b.rating - a.rating;
        case 'reviews': return b.reviews - a.reviews;
        case 'name-desc': return b.name.localeCompare(a.name);
        default: return a.name.localeCompare(b.name);
      }
    });

    return result;
  }, [search, selectedCategory, sortBy, priceMin, priceMax]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSearch = (e) => { setSearch(e.target.value); setPage(1); };
  const handleCategory = (cat) => { setSelectedCategory(cat); setPage(1); };
  const handleSort = (e) => { setSortBy(e.target.value); setPage(1); };

  return (
    <section className="catalog-section">
      <div className="section-header">
        <h2 className="section-title"><SlidersHorizontal size={24} /> Catálogo Completo</h2>
        <p className="section-subtitle">{allProducts.length} productos disponibles</p>
      </div>

      {/* Search bar */}
      <div className="search-bar">
        <span className="search-icon"><Search size={18} /></span>
        <input
          type="text"
          placeholder="Buscar instrumentos, marcas, accesorios..."
          value={search}
          onChange={handleSearch}
          className="search-input"
        />
        {search && (
          <button className="search-clear" onClick={() => { setSearch(''); setPage(1); }} aria-label="Limpiar búsqueda"><X size={16} /></button>
        )}
      </div>

      {/* Controls row */}
      <div className="controls-row">
        <button className="btn-filter-toggle" onClick={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal size={16} /> Filtros {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <select className="sort-select" value={sortBy} onChange={handleSort}>
          {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span className="results-count">
          {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Collapsible filters */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Precio mínimo (MXN)</label>
            <input
              type="number"
              placeholder="$0"
              value={priceMin}
              onChange={e => { setPriceMin(e.target.value); setPage(1); }}
              className="price-input"
            />
          </div>
          <div className="filter-group">
            <label>Precio máximo (MXN)</label>
            <input
              type="number"
              placeholder="Sin límite"
              value={priceMax}
              onChange={e => { setPriceMax(e.target.value); setPage(1); }}
              className="price-input"
            />
          </div>
          <button className="btn-clear-filters" onClick={() => { setPriceMin(''); setPriceMax(''); setSearch(''); setSelectedCategory('Todos'); setPage(1); }}>
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Category chips */}
      <div className="category-chips">
        {categories.map(cat => (
          <button
            key={cat}
            className={`chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {paged.length === 0 ? (
        <div className="no-results">
          <span className="no-results-icon"><Search size={48} /></span>
          <p>No se encontraron productos para tu búsqueda.</p>
          <button className="btn-secondary" onClick={() => { setSearch(''); setSelectedCategory('Todos'); setPage(1); }}>
            Ver todos
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {paged.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(1)} className="page-btn">«</button>
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="page-btn">‹</button>
          {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
            let p;
            if (totalPages <= 7) p = i + 1;
            else if (page <= 4) p = i + 1;
            else if (page >= totalPages - 3) p = totalPages - 6 + i;
            else p = page - 3 + i;
            return (
              <button
                key={p}
                className={`page-btn ${p === page ? 'active' : ''}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            );
          })}
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="page-btn">›</button>
          <button disabled={page === totalPages} onClick={() => setPage(totalPages)} className="page-btn">»</button>
        </div>
      )}
    </section>
  );
}
