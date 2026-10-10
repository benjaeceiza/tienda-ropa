import { createContext, useState, useContext } from 'react';
import './Loader.css';

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
      
      {/* Siempre está en el DOM, pero la clase 'activo' lo muestra u oculta */}
      <div className={`global-loader-overlay ${isLoading ? 'activo' : ''}`}>
        <div className="global-loader-spinner"></div>
        <span className="global-loader-text">CARGANDO...</span>
      </div>
      
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader debe ser usado dentro de un LoaderProvider");
  }
  return context;
};