import { useParams, Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import productosData from '../../data/products.json'; // Ajustá la ruta según dónde guardes el JSON
import './ListadoProductos.css';

const ListadoProductos = () => {
  // Capturamos el parámetro "categoria" de la URL
  const { categoria } = useParams();
  const cat = categoria?.toLowerCase();

  // Declaramos la variable vacía para llenarla según la lógica
  let productosAMostrar;

  // Si la ruta es "ropa", unimos las 3 subcategorías
  if (cat === 'ropa') {
    productosAMostrar = [
      ...productosData.hoodies,
      ...productosData.remeras,
      ...productosData.pantalones
    ];
  } else {
    // Si no es "ropa", busca la categoría exacta (ej: "calzados" o "accesorios")
    productosAMostrar = productosData[cat];
  }

  // Formateador de precios para Argentina (con puntito y signo $)
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(precio);
  };

  // Manejo de error: Si el usuario escribe /productos/cualquiercosa o la lista está vacía
  if (!productosAMostrar || productosAMostrar.length === 0) {
    return (
      <div className="listado-error-container">
        <h2>CATEGORÍA NO ENCONTRADA</h2>
        <p>Parece que te perdiste. Esa colección no existe.</p>
        <Link to="/" className="listado-btn-volver">Volver al Inicio</Link>
      </div>
    );
  }

  return (
    <section className="listado-container">
      {/* Título dinámico que cambia según la URL */}
      <div className="listado-header">
        <h1 className="listado-title">{categoria.toUpperCase()}</h1>
        <p className="listado-count">{productosAMostrar.length} productos</p>
      </div>

      <div className="listado-grid">
        {productosAMostrar.map((prod) => (
          <div className="listado-card" key={prod.id}>
            <div className="listado-img-container">
              <img src={prod.img} alt={prod.nombre} className="listado-img" />
              {/* Botón rápido de agregar al carrito estilo "Destacados" */}
              <button className="listado-add-btn">
                <FiShoppingCart />
              </button>
            </div>
            <div className="listado-info">
              <h3 className="listado-name">{prod.nombre}</h3>
              <p className="listado-price">{formatearPrecio(prod.precio)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ListadoProductos;