import { FiShoppingCart } from 'react-icons/fi';
import './Destacados.css';
import { Link } from 'react-router-dom';
import { useProducts } from '../../../context/product-context/ProductContext';

const Destacados = () => {
  const { products, loadingProducts } = useProducts();

  
  const productosDestacados = products.filter(p => p.destacado);
 

  // Si está cargando el fetch del backend, mostramos un textito (o tu loader)
  if (loadingProducts) {
    return <h2 className="featured-title" style={{textAlign: "center", marginTop: "40px"}}>CARGANDO...</h2>;
  }

  return (
    <section className="featured-section">
      <h2 className="featured-title">NEW ARRIVALS</h2>
      
      <div className="featured-grid">
        {productosDestacados.map((prod) => (
 
          <Link to={`/producto/${prod?._id}`} className="featured-card" key={prod?._id}>
          
            <div className="featured-img-container">
              {/* CORRECCIÓN: usamos prod.imagen (tu esquema de Mongoose) */}
              <img src={prod?.imagen} alt={prod?.nombre} className="featured-img" />
              <button className="featured-add-btn">
                <FiShoppingCart />
              </button>
            </div>

            <div className="featured-info">
              <h4 className="featured-name">{prod?.nombre}</h4>
              {/* Le agregamos el formateo al precio para que se vea lindo */}
              <p className="featured-price">${prod?.precio.toLocaleString('es-AR')}</p>
            </div>

          </Link>
        ))}
      </div>
    </section>
  );
};

export default Destacados;