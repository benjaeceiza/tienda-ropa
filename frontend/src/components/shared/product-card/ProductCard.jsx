import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Lógica de hover: imagen secundaria si tiene, sino la principal
  const displayImage = isHovered && product.imagenes?.length > 0 
    ? product.imagenes[0] 
    : product.imagen;

  // --- NUEVO: CALCULAMOS EL STOCK ---
  // Object.values saca las cantidades: [0, 5, 10]. .some() se fija si hay AL MENOS UNO mayor a 0
  const hayStock = product.stock 
    ? Object.values(product.stock).some(cantidad => cantidad > 0)
    : false;

  return (
    <div 
      // Le agregamos la clase 'out-of-stock' por si querés bajarle la opacidad en CSS
      className={`product-card ${isHovered ? 'card-hovered' : ''} ${!hayStock ? 'out-of-stock' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/producto/${product._id}`} className="product-card-link">
        
        <div className="product-image-container">
          <img 
            src={displayImage} 
            alt={product.nombre} 
            // Si no hay stock, le podés aplicar un filtro oscuro a la imagen
            className={`product-image ${!hayStock ? 'image-dimmed' : ''}`} 
          />
          
          {/* Cartelito de HOT */}
          {product.destacado && <span className="badge-destacado">HOT</span>}

          {/* --- NUEVO: CARTEL DE AGOTADO --- */}
          {!hayStock && <span className="badge-agotado">AGOTADO</span>}

        </div>

        {/* --- LA ZONA NEGRA Y ROJA --- */}
        <div className="product-info-dark">
          <div className="info-header">
            <span className="product-category-red">{product.categoria}</span>
          </div>
          <h3 className="product-name-white">{product.nombre}</h3>
          <div className="info-footer">
            <p className="product-price-white">
              ${product.precio.toLocaleString('es-AR')}
            </p>
            {/* Un detalle visual técnico en rojo */}
            <span className="red-accent-line"></span>
          </div>
        </div>

      </Link>
    </div>
  );
};

export default ProductCard;