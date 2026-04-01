import { useState } from 'react';
import { FiSearch, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">STRETEAT</div>

      {/* --- Navegación Desktop --- */}
      <nav className="navLinks desktop-only">
        <NavLink to="/">Inicio</NavLink>
        
        {/* Dropdown de Ropa */}
        <div className="dropdown-container">
          <NavLink to="/productos/ropa" className="nav-item">Ropa</NavLink>
          <div className="dropdown-menu">
            <NavLink to="/productos/hoodies">Hoodies</NavLink>
            <NavLink to="/productos/remeras">Remeras</NavLink>
            <NavLink to="/productos/pantalones">Pantalones</NavLink>
          </div>
        </div>

        <NavLink to="/productos/calzados">Calzado</NavLink>
        <NavLink to="/productos/accesorios">Accesorios</NavLink>
      </nav>

      {/* --- Íconos y Auth --- */}
      <div className="icons">
        <div className="auth-links desktop-only">
          <NavLink to="/login" className="auth-btn">Log In</NavLink>
          <NavLink to="/register" className="auth-btn register-btn">Sign Up</NavLink>
        </div>
        
        <FiSearch className="icon" />
        <FiShoppingBag className="icon" />
        <FiMenu className="icon mobile-menu-btn" onClick={toggleMenu} />
      </div>

      <div 
        className={`sidebar-overlay ${isMenuOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
      ></div>

      {/* --- Sidebar Mobile --- */}
      <div className={`sidebar ${isMenuOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <span className="logo">STRETEAT</span>
          <FiX className="icon close-btn" onClick={toggleMenu} />
        </div>
        
        <nav className="sidebar-links">
          <NavLink to="/" onClick={toggleMenu}>Inicio</NavLink>
          
          {/* Ropa y sus subcategorías en Mobile */}
          <div className="mobile-dropdown">
            <NavLink to="/productos/ropa" onClick={toggleMenu}>Ropa (Ver Todo)</NavLink>
            <NavLink to="/productos/hoodies" className="sub-link" onClick={toggleMenu}>- Hoodies</NavLink>
            <NavLink to="/productos/remeras" className="sub-link" onClick={toggleMenu}>- Remeras</NavLink>
            <NavLink to="/productos/pantalones" className="sub-link" onClick={toggleMenu}>- Pantalones</NavLink>
          </div>

          <NavLink to="/productos/calzados" onClick={toggleMenu}>Calzado</NavLink>
          <NavLink to="/productos/accesorios" onClick={toggleMenu}>Accesorios</NavLink>
        </nav>
        
        <div className="sidebar-auth">
          <NavLink to="/login" className="auth-btn sidebar-auth-btn" onClick={toggleMenu}>Log In</NavLink>
          <NavLink to="/register" className="auth-btn register-btn sidebar-auth-btn" onClick={toggleMenu}>Sign Up</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;