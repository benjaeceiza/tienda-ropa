import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/auth-context/AuthContext';


const AdminProtectedRoute = () => {
  // Acá traemos el estado global. Ajustá los nombres según lo que devuelva tu Contexto.
  const { user, isAuthenticated, loading } = useAuth();

  // 1. Mientras chequea el token (para que no te patee al login por demoras de red)
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#050505]">
        <p className="text-[#ff2a2a] font-bold animate-pulse tracking-widest">
          VERIFICANDO ACCESO...
        </p>
      </div>
    );
  }

  // 2. Si no está logueado, lo mandamos directo a iniciar sesión
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. Si está logueado pero NO es admin, lo rebotamos a la tienda
  if (user?.rol !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // 4. Si pasó todos los filtros, renderizamos el contenido (el AdminLayout)
  return <Outlet />;
};

export default AdminProtectedRoute;