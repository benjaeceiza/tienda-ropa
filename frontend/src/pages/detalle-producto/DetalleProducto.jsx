import { useState, useEffect, useLayoutEffect } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import { FiChevronLeft, FiHeart } from 'react-icons/fi';
import { useLoader } from '../../context/loader-context/LoaderContext';
import { useProducts } from '../../context/product-context/ProductContext';
import Beneficios from '../../components/ui/beneficios/Beneficios';
import { useCart } from '../../context/cart-context/CartContext';
import { useUser } from '../../context/user-context/UserContext'; // <-- IMPORTAMOS EL CONTEXTO DE USUARIO
import { useToast } from '../../context/toast-context/ToastContext';
import './DetalleProducto.css';

const DetalleProducto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [imagenActiva, setImagenActiva] = useState('');
    const [talleSeleccionado, setTalleSeleccionado] = useState('');
    
    const { addToCart } = useCart();
    // TRAEMOS PERFIL Y LAS FUNCIONES DE FAVORITOS
    const { perfil, addFavorito, removeFavorito } = useUser(); 
    const { showToast } = useToast();
    
    const { showLoader, hideLoader } = useLoader();
    const { products, loadingProducts } = useProducts();

    useLayoutEffect(() => {
        if (loadingProducts) {
            showLoader(); 
        } else {
            hideLoader(); 
        }
        return () => hideLoader();
    }, [loadingProducts, showLoader, hideLoader]);

    useEffect(() => {
        if (products.length > 0) {
            const encontrado = products.find((p) => p._id === id); 
            
            if (encontrado) {
                setProducto(encontrado);
                setImagenActiva(encontrado.imagen);
            }
        }
    }, [id, products]);

    const formatearPrecio = (precio) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            maximumFractionDigits: 0
        }).format(precio);
    };

    const handleAgregar = () => {
        if (talleSeleccionado) {
            addToCart(producto, talleSeleccionado, 1);
            showToast(`Producto agregado al carrito`, "success");
        }
    };

    // --- LOGICA DE FAVORITOS ---
    // Chequeamos si el producto actual está en el array de favoritos del usuario
    const isFavorito = perfil?.favoritos?.some((fav) => fav._id === producto?._id);

    const handleToggleFavorito = async () => {
        if (!perfil) {
            showToast("Tenés que iniciar sesión para guardar favoritos", "error");
            return;
        }

        if (isFavorito) {
            const res = await removeFavorito(producto._id);
            if (res.success) showToast("Eliminado de favoritos");
        } else {
            const res = await addFavorito(producto._id);
            if (res.success) showToast("Agregado a favoritos", "success");
        }
    };

    if (loadingProducts) return null; 

    if (!producto) {
        return (
            <div className="detalle-error">
                <h2>PRODUCTO NO ENCONTRADO</h2>
                <p>El producto no existe o fue eliminado.</p>
                <Link to="/productos/ropa" className="detalle-btn-volver">Volver a la tienda</Link>
            </div>
        );
    }

    const todasLasImagenes = [producto.imagen, ...(producto.imagenes || [])];

    return (
        <>
            <section className="detalle-container">
                <div className="detalle-breadcrumb">
                    <Link to="/productos/ropa"><FiChevronLeft /> Volver</Link>
                    <span>/ {producto.nombre}</span>
                </div>

                <div className="detalle-layout-nike">

                    <div className="detalle-galeria-wrapper">
                        <div className="detalle-miniaturas-col">
                            {todasLasImagenes.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`${producto.nombre} vista ${index + 1}`}
                                    className={`detalle-miniatura ${imagenActiva === img ? 'activa' : ''}`}
                                    onMouseEnter={() => setImagenActiva(img)} 
                                    onClick={() => setImagenActiva(img)}
                                />
                            ))}
                        </div>

                        <div className="detalle-img-principal-container">
                            <img src={imagenActiva} alt={producto.nombre} className="detalle-img-principal" />
                        </div>
                    </div>

                    <div className="detalle-info-col">
                        <p className="detalle-etiqueta-nuevo">Lo nuevo</p>
                        <h1 className="detalle-titulo">{producto.nombre}</h1>
                        <p className="detalle-subtitulo">STRETEAT Premium Collection</p>

                        <p className="detalle-precio">{formatearPrecio(producto.precio)}</p>
                        <p className="detalle-cuotas">Hasta 6x de {formatearPrecio(producto.precio / 6)} sin interés</p>

                        <div className="detalle-talles-seccion">
                            <div className="detalle-talles-header">
                                <span>Seleccionar Talle</span>
                                <a href="#" className="detalle-guia-talles">Guía de talles</a>
                            </div>

                            <div className="detalle-talles-grid">
                                {Object.entries(producto.stock).map(([talle, cantidad]) => {
                                    const agotado = cantidad === 0;
                                    return (
                                        <button
                                            key={talle}
                                            className={`detalle-talle-btn ${agotado ? 'agotado' : ''} ${talleSeleccionado === talle ? 'seleccionado' : ''}`}
                                            onClick={() => setTalleSeleccionado(talle)}
                                            disabled={agotado} 
                                        >
                                            {talle}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="detalle-acciones">
                            <button
                                className={`detalle-btn-comprar ${!talleSeleccionado ? 'deshabilitado' : ''}`}
                                disabled={!talleSeleccionado}
                                onClick={handleAgregar} 
                            >
                                {talleSeleccionado ? 'Agregar al Carrito' : 'Seleccioná un Talle'}
                            </button>
                            
                            {/* --- BOTÓN DE FAVORITOS ACTUALIZADO --- */}
                            <button 
                                className="detalle-btn-favorito" 
                                onClick={handleToggleFavorito}
                                style={{ color: isFavorito ? '#e74c3c' : 'inherit', borderColor: isFavorito ? '#e74c3c' : '#333' }}
                            >
                                Favorito <FiHeart fill={isFavorito ? '#e74c3c' : 'none'} />
                            </button>
                        </div>

                        <div className="detalle-descripcion">
                            <p>{producto.descripcion}</p>
                            <p>Envío gratis a partir de $100.000 a toda la Argentina.</p>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default DetalleProducto;