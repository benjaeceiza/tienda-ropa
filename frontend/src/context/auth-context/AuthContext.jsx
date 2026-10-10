import { createContext, useState, useContext, useEffect } from 'react';
import axios from "../../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  // 1. Verificación de sesión al cargar la app
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get('/auth/verify');
        
        if (res.data) {
          setIsAuthenticated(true);
          setUser(res.data);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkLogin();
  }, []);

  // 2. Función de Registro
  const signup = async (userData) => {
    try {
      const res = await axios.post('/auth/register', userData);
      setUser(res.data.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error al registrar usuario";
      setErrors([errorMsg]);
      return { success: false, message: errorMsg };
    }
  };

  // 3. Función de Login
  const signin = async (email, password) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      setUser(res.data.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error al iniciar sesión";
      setErrors([errorMsg]);
      return { success: false, message: errorMsg };
    }
  };

  // 4. Función de Logout (Le pega al backend para borrar la cookie)
  const logout = async () => {
    try {
      await axios.post('/auth/logout');
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Limpiar cartelitos de error después de 5 segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        user,
        isAuthenticated,
        loading,
        errors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};