import { FiHeart, FiTrash2 } from 'react-icons/fi';
import { useUser } from '../../../context/user-context/UserContext';
import { useToast } from '../../../context/toast-context/ToastContext';

const Favorites = ({ perfil }) => {
    
    const { removeFavorito } = useUser();
    const { showToast } = useToast();

    return (
        <div className="tab-pane fade-in">
            <div className="tab-header-flex">
                <div>
                    <h2>Mis Favoritos</h2>
                    <p className="tab-subtitle">Esa pilcha que te volvió loco y dejaste guardada.</p>
                </div>
            </div>

            {perfil?.favoritos?.length > 0 ? (
                <div className="favoritos-grid">
                    {perfil.favoritos.map((prod) => (
                        <div className="favorito-card" key={prod._id}>
                            <div className="fav-img-container">
                                {/* Ajustá 'prod.imagen' según cómo se llame en tu BD */}
                                <img src={prod.imagen || 'https://via.placeholder.com/300x300?text=Sin+Imagen'} alt={prod.nombre} />
                                <button
                                    className="btn-remove-fav"
                                    onClick={async () => {
                                        const res = await removeFavorito(prod._id);
                                        if (res.success) showToast("Eliminado de favoritos");
                                    }}
                                    title="Eliminar de favoritos"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                            <div className="fav-info">
                                <h4 className="fav-title">{prod.nombre}</h4>
                                <p className="fav-price">${prod.precio}</p>

                                <a href={`/producto/${prod._id}`} className="btn-outline-white">Ver Producto</a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <FiHeart className="empty-icon" />
                    <p>Todavía no tenés productos guardados.</p>
                    <button className="perfil-btn-save" onClick={() => window.location.href = '/productos/ropa'}>
                        Explorar la tienda
                    </button>
                </div>
            )}
        </div>
    );
}


export default Favorites;