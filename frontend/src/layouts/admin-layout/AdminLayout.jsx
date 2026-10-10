import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
  const navigate = useNavigate();
  // Estado para controlar si el menú móvil está abierto
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    // Acá iría tu lógica de deslogueo (borrar cookie/token, estado global)
    console.log('Cerrando sesión de Admin...');
    navigate('/'); // Lo mandamos de vuelta a la tienda
  };

  // Funciones para abrir/cerrar el menú
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="admin-container">
      
      {/* Overlay oscuro que aparece en móvil cuando el menú está abierto */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* SIDEBAR LATERAL */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="admin-brand">
          <h2>STRETEAT</h2>
          <span className="admin-badge">PANEL</span>
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin/dashboard" className="admin-nav-item" onClick={closeSidebar}>
            Dashboard
          </NavLink>
          
          <NavLink to="/admin/productos" className="admin-nav-item" onClick={closeSidebar}>
            Productos
          </NavLink>

          <NavLink to="/admin/ordenes" className="admin-nav-item" onClick={closeSidebar}>
            Ventas y Órdenes
          </NavLink>

          <NavLink to="/admin/usuarios" className="admin-nav-item" onClick={closeSidebar}>
            Usuarios
          </NavLink>
        </nav>

        <div className="admin-footer-sidebar">
          <button onClick={handleLogout} className="admin-logout-btn">
            Salir del Panel
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="admin-main-content">
        <header className="admin-topbar">
          
          {/* Botón de hamburguesa (solo se verá en móvil) */}
          <button className="mobile-menu-btn" onClick={toggleSidebar}>
            ☰
          </button>

          <p className="admin-greeting">Hola, Benja (Admin)</p>
          <a href="/" target="_blank" rel="noreferrer" className="admin-store-link">
            Ver Tienda
          </a>
        </header>

        <div className="admin-content-area">
          {/* El Outlet renderiza el componente hijo según la URL */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;