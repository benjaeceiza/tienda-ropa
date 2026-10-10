import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import './Footer.css';
import { Link } from 'react-router-dom';

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
            <li><Link to={"/productos/hoodies"}>Hoodies</Link></li>
            <li><Link to={"/productos/remeras"}>Remeras</Link></li>
            <li><Link to={"/productos/pantalones"}>Pantalones</Link></li>
            <li><Link to={"/productos/accesorios"}>Accesorios</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4 className="footer-subtitle">AYUDA</h4>
          <ul>
            <li><Link to={"#"}>Envíos</Link></li>
            <li><Link to={"#"}>Cambios</Link></li>
            <li><Link to={"#"}>Talles</Link></li>
            <li><Link to={"#"}>Contacto</Link></li>
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