import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Inicializamos el estado buscando si ya hay algo en LocalStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('streteat-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Cada vez que el carrito cambie, lo guardamos en LocalStorage automáticamente
  useEffect(() => {
    localStorage.setItem('streteat-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (producto, talle, cantidad = 1) => {
    setCart((prevCart) => {
      // Buscamos si el producto con ESE MISMO TALLE ya está en el carrito
      const itemExistente = prevCart.find(
        (item) => item.id === producto.id && item.talle === talle
      );

      if (itemExistente) {
        // Si existe, le sumamos la cantidad
        return prevCart.map((item) =>
          item.id === producto.id && item.talle === talle
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        // Si no existe, lo agregamos como item nuevo
        return [...prevCart, { ...producto, talle, cantidad }];
      }
    });
  };

  const removeFromCart = (id, talle) => {
    setCart((prevCart) => prevCart.filter(item => !(item.id === id && item.talle === talle)));
  };

  const clearCart = () => setCart([]);

  const totalPrecio = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrecio, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);