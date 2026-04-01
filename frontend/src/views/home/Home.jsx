import Beneficios from "./beneficios/Beneficios";
import Categorias from "./categorias/Categorias";
import Destacados from "./destacados/Destacados";
import Hero from "./hero/Hero";



const Home = () => {
    return(
        <>
         <Beneficios/>
         <Hero/>
         <Categorias/>
         <Destacados/>
        </>
    )
}


export default Home;