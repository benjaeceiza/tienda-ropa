import { useLocation, Outlet } from 'react-router-dom'; // 1. Sumamos Outlet acá
import Navbar from '../components/shared/navbar/Navbar';
import Footer from '../components/shared/footer/Footer';
import Beneficios from '../components/ui/beneficios/Beneficios';

const MainLayout = () => { // 2. Sacamos { children } de acá
  // Obtenemos la ruta actual
  const location = useLocation();

  // Creamos una variable que es "true" si estamos en login o register
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="layoutContainer">
      {/* Si NO estamos en auth, mostramos el Navbar */}
      {!isAuthPage && <Navbar />}
      {!isAuthPage && <Beneficios />}
      
      {/* 3. Cambiamos {children} por <Outlet /> */}
      <main className="mainContent">
        <Outlet /> 
      </main>
      
      {/* Si NO estamos en auth, mostramos el Footer */}
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default MainLayout;