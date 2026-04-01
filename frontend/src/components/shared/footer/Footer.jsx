import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <h2 className="footer-logo">STRETEAT</h2>
          <p className="footer-description">
            Diseñamos ropa para los que no tienen miedo a destacar. 
            Cultura urbana en cada costura.
          </p>
          <div className="footer-socials">
            <FaInstagram className="footer-social-icon" />
            <FaFacebook className="footer-social-icon" />
            <FaTwitter className="footer-social-icon" />
          </div>
        </div>

        <div className="footer-links">
          <h4 className="footer-subtitle">SHOP</h4>
          <ul>
            <li><a href="#">Hoodies</a></li>
            <li><a href="#">Remeras</a></li>
            <li><a href="#">Pantalones</a></li>
            <li><a href="#">Accesorios</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4 className="footer-subtitle">AYUDA</h4>
          <ul>
            <li><a href="#">Envíos</a></li>
            <li><a href="#">Cambios</a></li>
            <li><a href="#">Talles</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4 className="footer-subtitle">UNITE AL CLUB</h4>
          <p>Recibí lanzamientos exclusivos y un 15% OFF.</p>
          <form className="footer-form">
            <input type="email" placeholder="Tu email" className="footer-input" />
            <button type="submit" className="footer-btn">OK</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 STRETEAT. Todos los derechos reservados.</p>
        <p>Hecho en Argentina.</p>
      </div>
    </footer>
  );
};

export default Footer;