import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiLock } from 'react-icons/fi';

import './Checkout.css';
import { useCart } from '../../context/cart-context/CartContext';

const Checkout = () => {
  const { cart, totalPrecio, clearCart } = useCart();
  const navigate = useNavigate();

  // Estado básico para el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    dni: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    provincia: '',
    codigoPostal: '',
  });

  const costoEnvio = totalPrecio > 100000 ? 0 : 5500;
  const totalFinal = totalPrecio + costoEnvio;

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(precio);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Acá iría la conexión con MercadoPago o tu backend
    console.log("Procesando pago con datos:", formData);
    console.log("Productos:", cart);
    
    // Simulamos un pago exitoso
    alert("¡Compra realizada con éxito, loco!");
    clearCart(); // Vaciamos el carrito
    navigate('/'); // Lo mandamos al inicio
  };

  // Si no hay nada en el carrito, no lo dejamos ver el checkout
  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>TU CARRITO ESTÁ VACÍO</h2>
        <p>No tenés productos para pagar. Volvé a la tienda y sumá algo de ropa.</p>
        <Link to="/productos/ropa" className="checkout-btn-volver">IR A LA TIENDA</Link>
      </div>
    );
  }

  return (
    <section className="checkout-container">
      <div className="checkout-header">
        <Link to="/productos/ropa" className="checkout-back-link">
          <FiChevronLeft /> Volver a la tienda
        </Link>
      </div>

      <div className="checkout-layout">
        {/* --- COLUMNA IZQUIERDA: FORMULARIOS --- */}
        <div className="checkout-form-col">
          <form id="checkoutForm" onSubmit={handleSubmit}>
            
            {/* Sección: Contacto */}
            <div className="checkout-section">
              <h3 className="checkout-section-title">Información de contacto</h3>
              <div className="checkout-input-group">
                <input type="email" name="email" placeholder="Correo electrónico" required onChange={handleInputChange} />
              </div>
            </div>

            {/* Sección: Envío */}
            <div className="checkout-section">
              <h3 className="checkout-section-title">Dirección de envío</h3>
              <div className="checkout-row">
                <div className="checkout-input-group">
                  <input type="text" name="nombre" placeholder="Nombre" required onChange={handleInputChange} />
                </div>
                <div className="checkout-input-group">
                  <input type="text" name="apellido" placeholder="Apellido" required onChange={handleInputChange} />
                </div>
              </div>
              <div className="checkout-row">
                <div className="checkout-input-group">
                  <input type="text" name="dni" placeholder="DNI" required onChange={handleInputChange} />
                </div>
                <div className="checkout-input-group">
                  <input type="tel" name="telefono" placeholder="Teléfono" required onChange={handleInputChange} />
                </div>
              </div>
              <div className="checkout-input-group">
                <input type="text" name="direccion" placeholder="Calle y número (Ej: San Martín 123)" required onChange={handleInputChange} />
              </div>
              <div className="checkout-row multi">
                <div className="checkout-input-group">
                  <input type="text" name="ciudad" placeholder="Ciudad" required onChange={handleInputChange} />
                </div>
                <div className="checkout-input-group">
                  <select name="provincia" required onChange={handleInputChange} defaultValue="">
                    <option value="" disabled>Provincia</option>
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="CABA">CABA</option>
                    <option value="Córdoba">Córdoba</option>
                    <option value="San Luis">San Luis</option>
                    <option value="Mendoza">Mendoza</option>
                    <option value="Santa Fe">Santa Fe</option>
                  </select>
                </div>
                <div className="checkout-input-group">
                  <input type="text" name="codigoPostal" placeholder="C.P." required onChange={handleInputChange} />
                </div>
              </div>
            </div>

            {/* Sección: Pago */}
            <div className="checkout-section">
              <h3 className="checkout-section-title">Pago</h3>
              <p className="checkout-secure-note"><FiLock /> Todas las transacciones son seguras y están encriptadas.</p>
              
              <div className="checkout-payment-methods">
                <label className="checkout-radio-label">
                  <input type="radio" name="pago" value="mercadopago" defaultChecked />
                  <span>Mercado Pago (Tarjetas o saldo)</span>
                </label>
                <label className="checkout-radio-label">
                  <input type="radio" name="pago" value="transferencia" />
                  <span>Transferencia Bancaria (10% OFF)</span>
                </label>
              </div>
            </div>

          </form>
        </div>

        {/* --- COLUMNA DERECHA: RESUMEN --- */}
        <div className="checkout-summary-col">
          <div className="checkout-summary-card">
            <h3 className="checkout-summary-title">Resumen del pedido</h3>
            
            <div className="checkout-summary-items">
              {cart.map(item => (
                <div className="checkout-summary-item" key={`${item.id}-${item.talle}`}>
                  <div className="checkout-item-img-wrapper">
                    <img src={item.imagen} alt={item.nombre} />
                    <span className="checkout-item-badge">{item.cantidad}</span>
                  </div>
                  <div className="checkout-item-info">
                    <h4>{item.nombre}</h4>
                    <p>{item.talle}</p>
                  </div>
                  <div className="checkout-item-price">
                    {formatearPrecio(item.precio * item.cantidad)}
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-summary-totals">
              <div className="checkout-total-row">
                <span>Subtotal</span>
                <span>{formatearPrecio(totalPrecio)}</span>
              </div>
              <div className="checkout-total-row">
                <span>Envío</span>
                <span>{costoEnvio === 0 ? 'Gratis' : formatearPrecio(costoEnvio)}</span>
              </div>
              <div className="checkout-total-row grand-total">
                <span>Total</span>
                <span>{formatearPrecio(totalFinal)}</span>
              </div>
            </div>

            <button type="submit" form="checkoutForm" className="checkout-submit-btn">
              PAGAR AHORA
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Checkout;