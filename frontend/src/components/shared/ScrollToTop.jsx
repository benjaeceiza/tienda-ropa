import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Extraemos el pathname (la ruta actual) de la URL
  const { pathname } = useLocation();

  useEffect(() => {
    // Cada vez que el pathname cambie, scrollea a la posición X:0, Y:0
    window.scrollTo(0, 0);
  }, [pathname]);

  // Este componente no renderiza nada visualmente, trabaja en las sombras
  return null;
};

export default ScrollToTop;