
export const getProductById = async (productId) => {
  
    
    const response = await fetch(`${import.meta.VITE_BACKEND_URL}/api/products/${productId}`);
    const data = await response.json();


  

    if (!response.ok) {
        throw new Error(data.message || 'Error al obtener producto');
    }

   
    

    return data;
};