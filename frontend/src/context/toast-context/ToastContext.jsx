import { createContext, useContext, useState, useCallback } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import './Toast.css';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Usamos useCallback para que la función no se recree en cada render
  const showToast = useCallback((message) => {
    const id = Date.now();
    
    // Agregamos el nuevo toast al array
    setToasts((prev) => [...prev, { id, message }]);

    // Lo eliminamos automáticamente después de 3 segundos
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Contenedor visual de los Toasts */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast-notification">
            <FiCheckCircle className="toast-icon" />
            <span className="toast-message">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast debe usarse dentro de un ToastProvider");
  return context;
};