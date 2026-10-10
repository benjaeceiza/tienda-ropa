import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

import './ModifyProduct.css';
import ProductPreview from '../product-view/ProductPreview';


const ModifyProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '', descripcion: '', precio: '', descuento: 0, categoria: 'remeras', destacado: 'false'
    });

    const [dynamicStock, setDynamicStock] = useState([]);
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [existingImages, setExistingImages] = useState([]);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [draggedExistingIndex, setDraggedExistingIndex] = useState(null);
    const [draggedNewIndex, setDraggedNewIndex] = useState(null);

    // --- ESTADO DE ÉXITO ---
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setFetching(true);
                const urlFija = `http://localhost:8080/api/admin/productos/${productId}`;
                const response = await fetch(urlFija, { credentials: 'include' });

                if (!response.ok) throw new Error(`Error HTTP: ${response.status} - No se encontró el producto`);

                const prod = await response.json();

                setFormData({
                    nombre: prod.nombre || '', descripcion: prod.descripcion || '', precio: prod.precio || '',
                    descuento: prod.descuento || 0, categoria: prod.categoria || 'remeras', destacado: prod.destacado ? 'true' : 'false'
                });

                if (prod.stock) {
                    const stockArray = Object.keys(prod.stock).map(talle => ({
                        talle: talle, cantidad: prod.stock[talle]
                    }));
                    setDynamicStock(stockArray);
                }

                let loadedImages = [];
                if (prod.imagen) loadedImages.push(prod.imagen);
                if (prod.imagenes && Array.isArray(prod.imagenes)) {
                    prod.imagenes.forEach(img => {
                        if (!loadedImages.includes(img)) loadedImages.push(img);
                    });
                }
                setExistingImages(loadedImages);

            } catch (error) {
                setMessage({ type: 'error', text: 'No se pudo cargar el producto. ' + error.message });
            } finally {
                setFetching(false);
            }
        };

        if (productId) fetchProduct();
    }, [productId]);

    const addStockRow = () => setDynamicStock([...dynamicStock, { talle: '', cantidad: '' }]);
    const handleDynamicStockChange = (index, field, value) => {
        const newStock = [...dynamicStock];
        newStock[index][field] = field === 'cantidad' ? (value === '' ? '' : Number(value)) : value;
        setDynamicStock(newStock);
    };
    const removeStockRow = (index) => setDynamicStock(dynamicStock.filter((_, i) => i !== index));
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onDrop = useCallback(acceptedFiles => {
        setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
        const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
        setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] }
    });

    const removeNewImage = (index) => {
        setFiles(files.filter((_, i) => i !== index));
        setPreviews(previews.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index) => {
        setExistingImages(existingImages.filter((_, i) => i !== index));
    };

    // --- LÓGICA PARA REORDENAR IMÁGENES GUARDADAS ---
    const handleDragStartExisting = (index) => setDraggedExistingIndex(index);
    const handleDragOver = (e) => e.preventDefault();

    const handleDropExisting = (index, e) => {
        e.preventDefault();
        if (draggedExistingIndex === null || draggedExistingIndex === index) return;

        const newExisting = [...existingImages];
        const draggedImg = newExisting.splice(draggedExistingIndex, 1)[0];
        newExisting.splice(index, 0, draggedImg);

        setExistingImages(newExisting);
        setDraggedExistingIndex(null);
    };

    // --- LÓGICA PARA REORDENAR IMÁGENES NUEVAS ---
    const handleDragStartNew = (index) => setDraggedNewIndex(index);

    const handleDropNew = (index, e) => {
        e.preventDefault();
        if (draggedNewIndex === null || draggedNewIndex === index) return;

        const newFiles = [...files];
        const newPreviews = [...previews];

        const draggedFile = newFiles.splice(draggedNewIndex, 1)[0];
        const draggedPreview = newPreviews.splice(draggedNewIndex, 1)[0];

        newFiles.splice(index, 0, draggedFile);
        newPreviews.splice(index, 0, draggedPreview);

        setFiles(newFiles);
        setPreviews(newPreviews);
        setDraggedNewIndex(null);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (files.length === 0 && existingImages.length === 0) return setMessage({ type: 'error', text: 'Agregá al menos una foto.' });
        if (dynamicStock.length === 0) return setMessage({ type: 'error', text: 'Agregá al menos un talle.' });

        setLoading(true);

        const stockMap = {};
        dynamicStock.forEach(item => {
            if (item.talle) stockMap[item.talle] = item.cantidad === '' ? 0 : item.cantidad;
        });

        const data = new FormData();
        data.append('nombre', formData.nombre);
        data.append('descripcion', formData.descripcion);
        data.append('precio', formData.precio);
        data.append('descuento', formData.descuento);
        data.append('categoria', formData.categoria);
        data.append('destacado', formData.destacado);
        data.append('stock', JSON.stringify(stockMap));
        data.append('imagenesExistentes', JSON.stringify(existingImages));
        files.forEach(file => data.append('nuevasImagenes', file));

        try {
            const response = await fetch(`http://localhost:8080/api/admin/productos/${productId}`, {
                method: 'PUT', credentials: 'include', body: data,
            });

            if (!response.ok) throw new Error('Error al actualizar el producto en el servidor.');

            // ✅ SI TODO SALIÓ BIEN, ACTIVAMOS LA PANTALLA DE ÉXITO
            setIsSuccess(true);

        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="ep-form-message" style={{ color: 'white', textAlign: 'center', padding: '5rem' }}>Cargando datos de Streteat...</div>;

    // --- RENDERIZADO CONDICIONAL DE LA PANTALLA DE ÉXITO ---
    if (isSuccess) {
        return (
            <div className="ep-success-screen">
                <CheckCircle size={80} color="#10b981" className="success-icon" />
                <h2>¡Producto Actualizado!</h2>
                <p>Los cambios ya están reflejados en la tienda oficial de Streteat.</p>
                <div className="ep-success-actions">
                    <button onClick={() => navigate('/admin/productos')} className="ep-cancel-btn">
                        Volver al Panel
                    </button>
                    <Link to={`/producto/${productId}`} target="_blank" className="ep-submit-btn">
                        Ir al Producto
                    </Link>
                </div>
            </div>
        );
    }

    // --- RENDERIZADO NORMAL DEL FORMULARIO ---
    return (
        <div className="ep-layout-wrapper">
            <div className="ep-form-column">
                <div className="ep-form-container">
                    <div className="ep-form-header">
                        <h2>Editar Producto</h2>
                        <p>ID: {productId}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="ep-product-form">

                        <div className="ep-form-section">
                            <h3>Datos Principales</h3>
                            <div className="ep-input-group">
                                <label>Nombre del Producto</label>
                                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                            </div>

                            <div className="ep-input-group">
                                <label>Descripción</label>
                                <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows="3" required />
                            </div>

                            <div className="ep-form-row">
                                <div className="ep-input-group">
                                    <label>Precio ($)</label>
                                    <input type="number" name="precio" value={formData.precio} onChange={handleChange} min="0" required />
                                </div>
                                <div className="ep-input-group">
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

                        <div className="ep-form-section">
                            <div className="ep-section-header-dynamic">
                                <h3>Talles y Stock</h3>
                                <button type="button" onClick={addStockRow} className="ep-btn-add-talle">
                                    + Añadir Talle
                                </button>
                            </div>

                            <div className="ep-dynamic-stock-list">
                                {dynamicStock.length === 0 && <p className="ep-no-stock-msg">No hay talles agregados.</p>}
                                {dynamicStock.map((item, index) => (
                                    <div key={index} className="ep-dynamic-stock-row">
                                        <div className="ep-input-group">
                                            <input type="text" placeholder="Talle" value={item.talle} onChange={(e) => handleDynamicStockChange(index, 'talle', e.target.value)} required />
                                        </div>
                                        <div className="ep-input-group">
                                            <input type="number" placeholder="Cantidad" value={item.cantidad} onChange={(e) => handleDynamicStockChange(index, 'cantidad', e.target.value)} min="0" required />
                                        </div>
                                        <button type="button" onClick={() => removeStockRow(index)} className="ep-btn-remove-talle">&times;</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* --- SECCIÓN: GALERÍA DE IMÁGENES --- */}
                        <div className="ep-form-section">
                            <h3>Galería de Imágenes</h3>
                            
                            {/* IMÁGENES ACTUALES (GUARDADAS) */}
                            {existingImages.length > 0 && (
                                <div className="ep-existing-images-wrapper">
                                    <p className="ep-img-subtitle">Imágenes actuales (Arrástralas para reordenar):</p>
                                    <div className="ep-image-preview-container">
                                        {existingImages.map((src, index) => (
                                            <div 
                                                key={`exist-${index}`} 
                                                className={`ep-image-preview-card ${index === 0 ? 'main-image' : ''}`}
                                                draggable
                                                onDragStart={() => handleDragStartExisting(index)}
                                                onDragOver={handleDragOver}
                                                onDrop={(e) => handleDropExisting(index, e)}
                                                style={{ cursor: 'grab', opacity: draggedExistingIndex === index ? 0.5 : 1 }}
                                            >
                                                {/* Si es la primera foto de la lista, es la portada */}
                                                {index === 0 && <span className="ep-main-badge" style={{position: 'absolute', top: 5, left: 5, background: '#e50914', color: 'white', padding: '2px 6px', fontSize: '10px', borderRadius: '3px', zIndex: 10}}>PORTADA</span>}
                                                <img src={src} alt={`Guardada ${index}`} />
                                                <button type="button" className="ep-remove-image-btn" onClick={() => removeExistingImage(index)}>X</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ZONA DE DROP (NUEVAS FOTOS) */}
                            <div {...getRootProps()} className={`ep-dropzone ${isDragActive ? 'active' : ''}`}>
                                <input {...getInputProps()} />
                                <p>Arrastrá nuevas fotos acá para agregar</p>
                            </div>

                            {/* PREVISUALIZACIÓN NUEVAS FOTOS */}
                            {previews.length > 0 && (
                                <div className="ep-new-images-wrapper">
                                    <p className="ep-img-subtitle">Nuevas imágenes a subir (Arrástralas para reordenar):</p>
                                    <div className="ep-image-preview-container">
                                        {previews.map((src, index) => (
                                            <div 
                                                key={`new-${index}`} 
                                                className={`ep-image-preview-card ${existingImages.length === 0 && index === 0 ? 'main-image' : ''}`}
                                                draggable
                                                onDragStart={() => handleDragStartNew(index)}
                                                onDragOver={handleDragOver}
                                                onDrop={(e) => handleDropNew(index, e)}
                                                style={{ cursor: 'grab', opacity: draggedNewIndex === index ? 0.5 : 1 }}
                                            >
                                                <span className="ep-new-badge" style={{position: 'absolute', bottom: 5, right: 5, background: '#4CAF50', color: 'white', padding: '2px 6px', fontSize: '10px', borderRadius: '3px', zIndex: 10}}>NUEVA</span>
                                                
                                                {/* Si borró todas las viejas, la primera nueva pasa a ser portada */}
                                                {existingImages.length === 0 && index === 0 && <span className="ep-main-badge" style={{position: 'absolute', top: 5, left: 5, background: '#e50914', color: 'white', padding: '2px 6px', fontSize: '10px', borderRadius: '3px', zIndex: 10}}>PORTADA</span>}
                                                
                                                <img src={src} alt="Preview" />
                                                <button type="button" className="ep-remove-image-btn" onClick={() => removeNewImage(index)}>X</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {message.text && <div className={`ep-form-message ${message.type}`}>{message.text}</div>}

                        <div className="ep-form-actions">
                            <button type="button" className="ep-cancel-btn" onClick={() => navigate(-1)} disabled={loading}>
                                CANCELAR
                            </button>
                            <button type="submit" className="ep-submit-btn" disabled={loading}>
                                {loading ? 'GUARDANDO...' : 'GUARDAR CAMBIOS'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <ProductPreview formData={formData} dynamicStock={dynamicStock} previews={previews} existingImages={existingImages} />
        </div>
    );
};

export default ModifyProduct;