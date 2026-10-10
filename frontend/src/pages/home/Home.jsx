import { useLayoutEffect } from "react";
import Beneficios from "../../components/ui/beneficios/Beneficios";
import Categorias from "./categorias/Categorias";
import Destacados from "./destacados/Destacados";
import Hero from "./hero/Hero";
import { useLoader } from "../../context/loader-context/LoaderContext";

const Home = () => {
  const { showLoader, hideLoader } = useLoader();

  useLayoutEffect(() => {

    showLoader();

    const timer = setTimeout(() => {
      hideLoader(); 
    }, 800); 

    // 4. Buena práctica: limpiar el timer si el usuario cambia de vista rapidísimo
    return () => clearTimeout(timer);
  }, []); 

  return (
    <>
      <Hero />
      <Categorias />
      <Destacados />
    </>
  );
};

export default Home;