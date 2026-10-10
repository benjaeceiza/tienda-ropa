import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash2, Archive, ArchiveRestore } from 'lucide-react';

import './AdminProducts.css';
import ConfirmModal from '../../../../components/shared/modal-confirm/ConfirmModal';

const AdminProducts = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados de filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategoria, setFilterCategoria] = useState('todas');
    const [filterEstado, setFilterEstado] = useState('todos');

    // Estado centralizado para el Modal de Confirmación
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: '', // 'delete' o 'toggle'
        productId: null,
        productStatus: null, // Solo se usa para archivar/desarchivar
        isProcessing: false
    });

    const fetchProductos = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/productos`, {
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Error al traer los productos');

            const data = await response.json();
            setProductos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    // --- FUNCIONES PARA ABRIR EL MODAL ---
    const requestDelete = (id) => {
        setModalConfig({ isOpen: true, type: 'delete', productId: id, productStatus: null, isProcessing: false });
    };

    const requestToggleStatus = (id, estadoActual) => {
        setModalConfig({ isOpen: true, type: 'toggle', productId: id, productStatus: estadoActual, isProcessing: false });
    };

    const closeModal = () => {
        if (!modalConfig.isProcessing) {
            setModalConfig({ ...modalConfig, isOpen: false });
        }
    };

    // --- EJECUCIÓN REAL DE LAS ACCIONES ---
    const executeAction = async () => {
        setModalConfig({ ...modalConfig, isProcessing: true });
        const { type, productId, productStatus } = modalConfig;

        try {
            if (type === 'delete') {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/productos/${productId}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });
                if (!response.ok) throw new Error('Error al eliminar');
                setProductos(productos.filter(p => p._id !== productId));
            }
            else if (type === 'toggle') {
                const nuevoEstado = !productStatus;
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/productos/${productId}/estado`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ activo: nuevoEstado })
                });
                if (!response.ok) throw new Error('Error al actualizar estado');
                setProductos(productos.map(p => p._id === productId ? { ...p, activo: nuevoEstado } : p));
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            closeModal();
        }
    };

    // --- UTILIDADES Y FILTROS ---
    const calcularStockTotal = (stockMap) => {
        if (!stockMap) return 0;
        return Object.values(stockMap).reduce((total, cant) => total + cant, 0);
    };

    const productosFiltrados = productos.filter(producto => {
        const matchSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            producto.categoria.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategoria = filterCategoria === 'todas' || producto.categoria.toLowerCase() === filterCategoria.toLowerCase();
        const isActivo = producto.activo !== false;
        const matchEstado = filterEstado === 'todos' ||
            (filterEstado === 'activos' && isActivo) ||
            (filterEstado === 'inactivos' && !isActivo);

        return matchSearch && matchCategoria && matchEstado;
    });

    if (loading) return <div className="admin-loading">Cargando inventario...</div>;
    if (error) return <div className="admin-error">Error: {error}</div>;

    // Lógica para determinar qué textos pasarle al modal según la acción
    const modalTitle = modalConfig.type === 'delete' ? 'Eliminar Producto' : (modalConfig.productStatus ? 'Archivar Producto' : 'Desarchivar Producto');
    const modalMessage = modalConfig.type === 'delete'
        ? '¿Estás seguro de eliminar este producto definitivamente? Esta acción borrará todas sus imágenes y no se puede deshacer.'
        : `¿Estás seguro de ${modalConfig.productStatus ? 'archivar' : 'volver a activar'} este producto en la tienda?`;
    const modalConfirmText = modalConfig.type === 'delete' ? 'ELIMINAR' : 'CONFIRMAR';
    const modalThemeColor = modalConfig.type === 'delete' ? 'danger' : 'warning';

    return (
        <div className="admin-products-container">
            <div className="admin-products-header">
                <div>
                    <h2>Inventario</h2>
                    <p>Gestioná todos los productos de la tienda.</p>
                </div>
                <Link to="/admin/productos/nuevo" className="btn-nuevo-producto">
                    + NUEVO PRODUCTO
                </Link>
            </div>

            {/* BARRA DE FILTROS */}
            <div className="admin-filters-bar">
                <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="admin-search-input"
                />

                <div className="admin-filters-selects">
                    <select value={filterCategoria} onChange={(e) => setFilterCategoria(e.target.value)} className="admin-select-filter">
                        <option value="todas">Todas las categorías</option>
                        <option value="remeras">Remeras</option>
                        <option value="hoodies">Hoodies</option>
                        <option value="pantalones">Pantalones</option>
                        <option value="calzados">Calzados</option>
                        <option value="accesorios">Accesorios</option>
                    </select>

                    <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)} className="admin-select-filter">
                        <option value="todos">Todos los estados</option>
                        <option value="activos">Solo Activos</option>
                        <option value="inactivos">Solo Archivados</option>
                    </select>
                </div>

                <span className="results-count">
                    {productosFiltrados.length} {productosFiltrados.length === 1 ? 'resultado' : 'resultados'}
                </span>
            </div>

            {/* TABLA */}
            <div className="table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosFiltrados.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center">No se encontraron coincidencias.</td>
                            </tr>
                        ) : (
                            productosFiltrados.map(producto => {
                                const isActivo = producto.activo !== false;

                                return (
                                    <tr key={producto._id} className={!isActivo ? 'row-archived' : ''}>
                                        <td data-label="Producto">
                                            <div className="product-cell-info">
                                                <img src={producto.imagen || producto.imagenes?.[0]} alt={producto.nombre} className="product-mini-img" />
                                                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                                    <span className="product-name">{producto.nombre}</span>
                                                    {producto.descuento > 0 && <span className="badge-discount-small">{producto.descuento}% OFF</span>}
                                                </div>
                                            </div>
                                        </td>
                                        <td data-label="Categoría" className="capitalize">{producto.categoria}</td>
                                        <td data-label="Precio" className="price-cell">${producto.precio?.toLocaleString('es-AR')}</td>
                                        <td data-label="Stock">
                                            <span className={`stock-indicator ${calcularStockTotal(producto.stock) === 0 ? 'out-of-stock' : ''}`}>
                                                {calcularStockTotal(producto.stock)} un.
                                            </span>
                                        </td>
                                        <td data-label="Estado">
                                            <span className={`status-badge ${isActivo ? 'active' : 'inactive'}`}>
                                                {isActivo ? 'Activo' : 'Archivado'}
                                            </span>
                                        </td>
                                        <td data-label="Acciones" className="actions-cell">
                                            <div className="actions-container">
                                                <Link to={`/producto/${producto._id}`} target="_blank" className="action-icon view" title="Ver en tienda">
                                                    <Eye size={18} />
                                                </Link>

                                                <Link to={`/admin/productos/modify/${producto._id}`} className="action-icon edit" title="Editar">
                                                    <Edit size={18} />
                                                </Link>

                                                <button
                                                    onClick={() => requestToggleStatus(producto._id, isActivo)}
                                                    className={`action-icon ${isActivo ? 'archive' : 'restore'}`}
                                                    title={isActivo ? "Archivar" : "Desarchivar"}
                                                >
                                                    {isActivo ? <Archive size={18} /> : <ArchiveRestore size={18} />}
                                                </button>

                                                <button
                                                    onClick={() => requestDelete(producto._id)}
                                                    className="action-icon delete"
                                                    title="Eliminar permanentemente"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* INSTANCIA DEL MODAL */}
            <ConfirmModal
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                onConfirm={executeAction}
                title={modalTitle}
                message={modalMessage}
                confirmText={modalConfirmText}
                type={modalThemeColor}
                isLoading={modalConfig.isProcessing}
            />
        </div>
    );
};

export default AdminProducts;