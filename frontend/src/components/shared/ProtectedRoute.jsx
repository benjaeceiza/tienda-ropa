import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/auth-context/AuthContext';


const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    // 1. Si todavía está pensando si tenés sesión o no, no hacemos nada (esperamos).
    // Podés retornar null para que actúe tu loader global, o un div vacío.
    if (loading) {
        return null; 
    }

    // 2. Si ya terminó de pensar y NO estás autenticado, te patea al login.
    // El "replace" es para que si toca la flecha de "Atrás" en el navegador, no vuelva a caer acá.
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // 3. Si todo está joya, renderiza el componente que querías ver (el Outlet es el contenido interno).
    return <Outlet />;
};

export default ProtectedRoute;