import { useEffect, useLayoutEffect } from 'react'; // Volamos el useState y el useLayoutEffect
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useLoader } from '../../context/loader-context/LoaderContext'; 
import { useProducts } from '../../context/product-context/ProductContext';
import ProductCard from '../../components/shared/product-card/ProductCard';
import './ListadoProductos.css';

const ListadoProductos = () => {
  const { categoria } = useParams();
  const cat = categoria?.toLowerCase();
  
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const { showLoader, hideLoader } = useLoader(); 
  
  // 1. Extraemos el catálogo real de MongoDB y el estado de carga
  const { products, loadingProducts } = useProducts(); 

  // 2. EL LOADER DINÁMICO (Atado 100% a la base de datos)
  useLayoutEffect(() => {
    if (loadingProducts) {
      showLoader();
    } else {
      hideLoader();
    }
    
    // Limpieza por si el usuario cambia de vista rápido
    return () => hideLoader();
  }, [loadingProducts, showLoader, hideLoader]);

  // 3. ESTADO DERIVADO: Filtramos al vuelo (Chau setTimeout)
  let productosAMostrar = [];

  // Solo filtramos si ya terminó de cargar el backend
  if (!loadingProducts && products.length > 0) {
    if (cat === 'busqueda') {
      productosAMostrar = products.filter(prod => 
        prod.nombre.toLowerCase().includes(query) || 
        prod.categoria.toLowerCase().includes(query)
      );
    } else if (cat === 'ropa') {
      productosAMostrar = products.filter(prod => 
        ['hoodies', 'remeras', 'pantalones'].includes(prod.categoria)
      );
    } else {
      productosAMostrar = products.filter(prod => prod.categoria === cat);
    }
  }

  // Si está cargando el backend, devolvemos null para que el loader cubra todo limpio
  if (loadingProducts) {
    return null;
  }

  // 4. PANTALLA DE ERROR FACHERA (Usamos las clases que creamos en DetalleProducto)
  if (!productosAMostrar || productosAMostrar.length === 0) {
    return (
      <div className="detalle-error">
        <h2>{cat === 'busqueda' ? 'SIN RESULTADOS' : 'CATEGORÍA NO ENCONTRADA'}</h2>
        <p>
          {cat === 'busqueda' 
            ? `No encontramos nada que coincida con "${searchParams.get('q')}". Probá con otra palabra.` 
            : 'Parece que te perdiste. Esa colección no existe.'}
        </p>
        <Link to="/productos/ropa" className="detalle-btn-volver">Volver a la tienda</Link>
      </div>
    );
  }

  const tituloVista = cat === 'busqueda' 
    ? `RESULTADOS PARA: "${searchParams.get('q').toUpperCase()}"` 
    : categoria.toUpperCase();

  return (
    <section className="listado-container">
      <div className="listado-header">
        <h1 className="listado-title">{tituloVista}</h1>
        {/* Como ya pasó la validación de loadingProducts arriba, esto se muestra siempre */}
        <p className="listado-count">{productosAMostrar.length} productos</p>
      </div>

      <div className="listado-grid">
        {productosAMostrar.map((prod) => (
          <ProductCard key={prod._id} product={prod} />
        ))}
      </div>
    </section>
  );
};

export default ListadoProductos;