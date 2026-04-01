import { FiShoppingCart } from 'react-icons/fi';
import './Destacados.css';

const productosDestacados = [
  { id: 1, nombre: 'Hoodie Essential Dark', precio: '$45.000', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop' },
  { id: 2, nombre: 'Remera Oversize Boxy', precio: '$18.500', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop' },
  { id: 3, nombre: 'Cargo Pants Utility', precio: '$55.000', img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop' },
  { id: 4, nombre: 'Sneakers Street Pro', precio: '$85.000', img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=600&auto=format&fit=crop' }
];

const Destacados = () => {
  return (
    <section className="featured-section">
      <h2 className="featured-title">NEW ARRIVALS</h2>
      
      <div className="featured-grid">
        {productosDestacados.map((prod) => (
          <div className="featured-card" key={prod.id}>
            <div className="featured-img-container">
              <img src={prod.img} alt={prod.nombre} className="featured-img" />
              <button className="featured-add-btn">
                <FiShoppingCart />
              </button>
            </div>
            <div className="featured-info">
              <h4 className="featured-name">{prod.nombre}</h4>
              <p className="featured-price">{prod.precio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Destacados;