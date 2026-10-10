import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; 

// Creamos el contexto
const ProductContext = createContext();

// Hook personalizado para usar el contexto fácilmente
export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProducts debe usarse dentro de un ProductProvider");
    }
    return context;
};

// El Provider que va a envolver tu app
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    // Función para traer los productos del backend
    const fetchProducts = async () => {
        try {
            setLoadingProducts(true);
            
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`); 
            
            setProducts(response.data);
            setLoadingProducts(false);
        } catch (error) {
            console.error("Error al cargar los productos:", error);
            setLoadingProducts(false);
        }
    };

    // Apenas se monta el contexto, vamos a buscar la ropa
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, loadingProducts }}>
            {children}
        </ProductContext.Provider>
    );
};