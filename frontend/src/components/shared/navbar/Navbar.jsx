import { useState } from 'react';
import { FiSearch, FiShoppingBag, FiMenu, FiX, FiUser, FiLogOut, FiHeart } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';

import './Navbar.css';
import CartDrawer from '../cart/CartDrawer';
import { useAuth } from '../../../context/auth-context/AuthContext';
import { useUser } from '../../../context/user-context/UserContext'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Extraemos lo de seguridad del AuthContext
  const { isAuthenticated, logout } = useAuth();
  
  // Extraemos TODA la data fresca del UserContext
  const { perfil } = useUser();
  
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/productos/busqueda?q=${searchTerm}`);
      setIsSearchOpen(false);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    if (isMenuOpen) toggleMenu(); 
  };

  // Función para determinar el nombre a mostrar (fallback por si 'perfil' no cargó)
  const displayNombre = perfil?.nombre ? perfil.nombre.toUpperCase() : 'USUARIO';

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
        STRETEAT
      </div>

      {/* --- Navegación Desktop --- */}
      <nav className="navLinks desktop-only">
        <NavLink to="/">Inicio</NavLink>
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
          {isAuthenticated ? (
            // --- MOSTRAR NOMBRE SI ESTÁ LOGUEADO (Desktop) ---
            <div className="user-nav-container">
              {/* ACÁ ESTÁ LA MAGIA, LEE DEL PERFIL Y NO DEL USER */}
              <span className="user-name">HOLA, {displayNombre}</span>
              
              {/* EL MENÚ DROPDOWN FACHERITO */}
              <div className="user-dropdown">
                <NavLink to="/perfil" className="dropdown-item">
                  <FiUser className="dropdown-icon" /> Mi Perfil
                </NavLink>
                <NavLink to="/perfil?tab=compras" className="dropdown-item">
                  <FiShoppingBag className="dropdown-icon" /> Mis Compras
                </NavLink>
                <NavLink to="/perfil?tab=favoritos" className="dropdown-item">
                  <FiHeart className="dropdown-icon" /> Favoritos
                </NavLink>
                
                {/* Chequeamos rol con 'perfil' */}
                {perfil?.rol === 'admin' && (
                  <NavLink to="/admin" className="dropdown-item">
                    Panel Admin
                  </NavLink>
                )}
                
                <div className="dropdown-divider"></div>
                
                <button onClick={handleLogout} className="dropdown-item logout-btn">
                  <FiLogOut className="dropdown-icon" /> Cerrar Sesión
                </button>
              </div>

            </div>
          ) : (
            // --- MOSTRAR BOTONES SI NO (Desktop) ---
            <>
              <NavLink to="/login" className="auth-btn">Log In</NavLink>
              <NavLink to="/register" className="auth-btn register-btn">Sign Up</NavLink>
            </>
          )}
        </div>
        
        <div className="search-container">
          <FiSearch className="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} />
          <div className={`search-dropdown ${isSearchOpen ? 'active' : ''}`}>
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input 
                type="text" 
                placeholder="Buscar producto..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="search-btn">Ir</button>
            </form>
          </div>
        </div>

        <FiShoppingBag className="icon" onClick={() => setIsCartOpen(true)} />
        <FiMenu className="icon mobile-menu-btn" onClick={toggleMenu} />
      </div>

      <div className={`sidebar-overlay ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}></div>

      {/* --- Sidebar Mobile --- */}
      <div className={`sidebar ${isMenuOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <span className="logo">STRETEAT</span>
          <FiX className="icon close-btn" onClick={toggleMenu} />
        </div>
        
        <nav className="sidebar-links">
          {isAuthenticated && (
            <div className="mobile-user-info">
              {/* ACTUALIZADO PARA MOBILE TAMBIÉN */}
              <FiUser /> <span>{perfil?.nombre || 'Usuario'} {perfil?.apellido || ''}</span>
            </div>
          )}

          <NavLink to="/" onClick={toggleMenu}>Inicio</NavLink>
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
          {isAuthenticated ? (
            <button onClick={handleLogout} className="auth-btn sidebar-auth-btn logout-mobile">
              Cerrar Sesión
            </button>
          ) : (
            <>
              <NavLink to="/login" className="auth-btn sidebar-auth-btn" onClick={toggleMenu}>Log In</NavLink>
              <NavLink to="/register" className="auth-btn register-btn sidebar-auth-btn" onClick={toggleMenu}>Sign Up</NavLink>
            </>
          )}
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Navbar;