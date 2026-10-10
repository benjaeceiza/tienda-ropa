import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react'; // Importamos el ícono
import ProductPreview from '../product-view/ProductPreview';
import './CreateProduct.css';

const CreateProduct = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        descuento: 0,
        categoria: 'remeras',
        destacado: 'false'
    });

    const [dynamicStock, setDynamicStock] = useState([]);
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [draggedIndex, setDraggedIndex] = useState(null);

    // --- ESTADOS PARA LA PANTALLA DE ÉXITO ---
    const [isSuccess, setIsSuccess] = useState(false);
    const [newProductId, setNewProductId] = useState(null);

    // --- MANEJO DINÁMICO DE TALLES ---
    const addStockRow = () => setDynamicStock([...dynamicStock, { talle: '', cantidad: '' }]);

    const handleDynamicStockChange = (index, field, value) => {
        const newStock = [...dynamicStock];
        newStock[index][field] = field === 'cantidad' ? (value === '' ? '' : Number(value)) : value;
        setDynamicStock(newStock);
    };

    const removeStockRow = (index) => setDynamicStock(dynamicStock.filter((_, i) => i !== index));
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // --- LÓGICA DEL DRAG & DROP ---
    const onDrop = useCallback(acceptedFiles => {
        setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
        const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
        setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] }
    });

    const removeImage = (indexToRemove) => {
        setFiles(files.filter((_, index) => index !== indexToRemove));
        setPreviews(previews.filter((_, index) => index !== indexToRemove));
    };

    // --- LÓGICA PARA REORDENAR IMÁGENES (DRAG & DROP NATIVO) ---
    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Obligatorio para que el navegador permita soltar el elemento
    };

    const handleDropImage = (index, e) => {
        e.preventDefault();

        // Si la soltamos en el mismo lugar, no hacemos nada
        if (draggedIndex === null || draggedIndex === index) return;

        // Copiamos los arrays actuales
        const newFiles = [...files];
        const newPreviews = [...previews];

        // 1. Sacamos el archivo de la posición original
        const draggedFile = newFiles.splice(draggedIndex, 1)[0];
        const draggedPreview = newPreviews.splice(draggedIndex, 1)[0];

        // 2. Lo insertamos en la nueva posición (donde soltamos el mouse)
        newFiles.splice(index, 0, draggedFile);
        newPreviews.splice(index, 0, draggedPreview);

        // 3. Actualizamos los estados
        setFiles(newFiles);
        setPreviews(newPreviews);
        setDraggedIndex(null);
    };


    // --- ENVÍO AL BACKEND ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (files.length === 0) {
            setMessage({ type: 'error', text: '¡Subí al menos una foto, pa!' });
            return;
        }

        if (dynamicStock.length === 0) {
            setMessage({ type: 'error', text: 'Agregá al menos un talle y su stock.' });
            return;
        }

        setLoading(true);

        const stockMap = {};
        dynamicStock.forEach(item => {
            if (item.talle) {
                stockMap[item.talle] = item.cantidad === '' ? 0 : item.cantidad;
            }
        });

        const data = new FormData();
        data.append('nombre', formData.nombre);
        data.append('descripcion', formData.descripcion);
        data.append('precio', formData.precio);
        data.append('descuento', formData.descuento);
        data.append('categoria', formData.categoria);
        data.append('destacado', formData.destacado);
        data.append('stock', JSON.stringify(stockMap));

        files.forEach(file => data.append('imagenes', file));

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/productos`, {
                method: 'POST',
                credentials: 'include',
                body: data,
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Error al crear producto');

            // Capturamos el ID del producto recién creado (Ajustalo si tu backend lo manda distinto)
            const createdId = result.producto?._id || result._id;
            setNewProductId(createdId);

            // Activamos la pantalla de éxito
            setIsSuccess(true);

        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    // --- RENDERIZADO CONDICIONAL DE LA PANTALLA DE ÉXITO ---
    if (isSuccess) {
        return (
            <div className="cp-success-screen">
                <CheckCircle size={80} color="#10b981" className="success-icon" />
                <h2>¡Producto Creado!</h2>
                <p>El nuevo producto ya está publicado en la tienda oficial de Streteat.</p>
                <div className="cp-success-actions">
                    <button onClick={() => navigate('/admin/productos')} className="cp-cancel-btn">
                        Volver al Panel
                    </button>
                    {newProductId && (
                        <Link to={`/producto/${newProductId}`} target="_blank" className="cp-submit-btn">
                            Ver Producto Creado
                        </Link>
                    )}
                </div>
            </div>
        );
    }

    // --- RENDERIZADO NORMAL DEL FORMULARIO ---
    return (
        <div className="cp-layout-wrapper">

            {/* === COLUMNA IZQUIERDA: FORMULARIO === */}
            <div className="cp-form-column">
                <div className="cp-form-container">
                    <div className="cp-form-header">
                        <h2>Cargar Producto</h2>
                        <p>Gestión dinámica de stock para Streteat.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="cp-product-form">

                        <div className="cp-form-section">
                            <h3>Datos Principales</h3>
                            <div className="cp-input-group">
                                <label>Nombre del Producto</label>
                                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej: Jeans Carpenter Black" required />
                            </div>

                            <div className="cp-input-group">
                                <label>Descripción</label>
                                <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows="3" required />
                            </div>

                            <div className="cp-form-row">
                                <div className="cp-input-group">
                                    <label>Precio ($)</label>
                                    <input type="number" name="precio" value={formData.precio} onChange={handleChange} min="0" required />
                                </div>
                                <div className="cp-input-group">
                                    <label>Categoría</label>
                                    <select name="categoria" value={formData.categoria} onChange={handleChange}>
                                        <option value="remeras">Remeras</option>
                                        <option value="hoodies">Hoodies</option>
                                        <option value="pantalones">Pantalones</option>
                                        <option value="calzados">Calzado</option>
                                        <option value="accesorios">Accesorios</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* --- SECCIÓN DE STOCK DINÁMICO --- */}
                        <div className="cp-form-section">
                            <div className="cp-section-header-dynamic">
                                <h3>Talles y Stock</h3>
                                <button type="button" onClick={addStockRow} className="cp-btn-add-talle">
                                    + Añadir Talle
                                </button>
                            </div>

                            <div className="cp-dynamic-stock-list">
                                {dynamicStock.length === 0 && <p className="cp-no-stock-msg">No hay talles agregados. Hacé clic en "Añadir Talle".</p>}

                                {dynamicStock.map((item, index) => (
                                    <div key={index} className="cp-dynamic-stock-row">
                                        <div className="cp-input-group">
                                            <input
                                                type="text"
                                                placeholder="Talle (ej: 42, XL, L)"
                                                value={item.talle}
                                                onChange={(e) => handleDynamicStockChange(index, 'talle', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="cp-input-group">
                                            <input
                                                type="number"
                                                placeholder="Cantidad"
                                                value={item.cantidad}
                                                onChange={(e) => handleDynamicStockChange(index, 'cantidad', e.target.value)}
                                                min="0"
                                                required
                                            />
                                        </div>
                                        <button type="button" onClick={() => removeStockRow(index)} className="cp-btn-remove-talle">
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* --- SECCIÓN DE IMÁGENES --- */}
                        <div className="cp-form-section">
                            <h3>Galería de Imágenes</h3>
                            <div {...getRootProps()} className={`cp-dropzone ${isDragActive ? 'active' : ''}`}>
                                <input {...getInputProps()} />
                                <p>Arrastrá tus fotos acá</p>
                            </div>

                            {previews.length > 0 && (
                                <div className="cp-image-preview-container">
                                    {previews.map((src, index) => (
                                        <div
                                            key={index}
                                            className={`cp-image-preview-card ${index === 0 ? 'main-image' : ''}`}

                                            /* --- NUEVAS PROPIEDADES DRAG & DROP --- */
                                            draggable
                                            onDragStart={() => handleDragStart(index)}
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => handleDropImage(index, e)}
                                            style={{ cursor: 'grab', opacity: draggedIndex === index ? 0.5 : 1 }}
                                        >
                                            {/* El resto queda igual */}
                                            {index === 0 && <span className="cp-main-badge">PORTADA</span>}
                                            <img src={src} alt="Preview" />
                                            <button type="button" className="cp-remove-image-btn" onClick={() => removeImage(index)}>X</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {message.text && <div className={`cp-form-message ${message.type}`}>{message.text}</div>}

                        {/* --- BOTONES DE ACCIÓN --- */}
                        <div className="cp-form-actions">
                            <button
                                type="button"
                                className="cp-cancel-btn"
                                onClick={() => navigate(-1)}
                                disabled={loading}
                            >
                                CANCELAR
                            </button>
                            <button type="submit" className="cp-submit-btn" disabled={loading}>
                                {loading ? 'PUBLICANDO...' : 'PUBLICAR PRODUCTO'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* === COLUMNA DERECHA: VISTA PREVIA REUTILIZADA === */}
            <ProductPreview
                formData={formData}
                dynamicStock={dynamicStock}
                previews={previews}
                existingImages={[]}
            />

        </div>
    );
};

export default CreateProduct;