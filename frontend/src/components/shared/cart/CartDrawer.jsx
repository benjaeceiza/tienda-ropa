import { FiX, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './CartDrawer.css';
import { useCart } from '../../../context/cart-context/CartContext';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, totalPrecio, removeFromCart } = useCart();

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(precio);
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>

      <div className={`cart-drawer ${isOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h2>TU CARRITO ({cart.length})</h2>
          <button className="cart-close-btn" onClick={onClose}><FiX /></button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <p>Tu carrito está vacío.</p>
              <button className="cart-continue-btn" onClick={onClose}>Empezar a comprar</button>
            </div>
          ) : (
            <div className="cart-items-container">
              {cart.map((item) => (
                <div className="cart-item" key={`${item.id}-${item.talle}`}>
                  <img src={item.imagen} alt={item.nombre} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.nombre}</h4>
                    <p className="cart-item-size">Talle: {item.talle}</p>
                    <div className="cart-item-bottom">
                      <span className="cart-item-price">{formatearPrecio(item.precio)}</span>
                      <span className="cart-item-qty">Cant: {item.cantidad}</span>
                    </div>
                  </div>
                  <button 
                    className="cart-item-remove" 
                    onClick={() => removeFromCart(item.id, item.talle)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>TOTAL:</span>
              <span>{formatearPrecio(totalPrecio)}</span>
            </div>
            <p className="cart-shipping-info">Envío bonificado a todo el país.</p>
            <Link to="/checkout" className="cart-checkout-btn" onClick={onClose}>
              FINALIZAR COMPRA
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;