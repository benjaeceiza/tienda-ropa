import React from 'react';

const ProductPreview = ({ formData, dynamicStock, previews, existingImages }) => {
    
    // Lo guardamos en una variable para no ejecutar la lógica dos veces en el HTML
    const imageSrc = (previews && previews.length > 0) ? previews[0] 
                   : (existingImages && existingImages.length > 0) ? existingImages[0] 
                   : null;

    return (
        <div className="ep-preview-column">
            <div className="ep-preview-sticky-container">
                <h3 className="ep-preview-title">Vista Previa</h3>
                <p className="ep-preview-subtitle">Así se verá en la tienda</p>
                
                <div className="store-product-card">
                    <div className="store-card-image">
                        {imageSrc ? (
                            <img src={imageSrc} alt="Preview" />
                        ) : (
                            <div className="store-card-placeholder">Sin Imagen</div>
                        )}
                        <span className="store-card-category">
                            {formData.categoria ? formData.categoria.toUpperCase() : 'CATEGORÍA'}
                        </span>
                    </div>

                    <div className="store-card-info">
                        <h4 className="store-card-name">
                            {formData.nombre ? formData.nombre.toUpperCase() : 'NOMBRE DEL PRODUCTO'}
                        </h4>
                        
                        <p className="store-card-price">
                            ${formData.precio ? Number(formData.precio).toLocaleString('es-AR') : '0'}
                        </p>

                        <div className="store-card-sizes">
                            {dynamicStock && dynamicStock.length > 0 ? (
                                dynamicStock.map((item, index) => (
                                    item.talle && item.cantidad > 0 && (
                                        <span key={index} className="size-badge">{item.talle}</span>
                                    )
                                ))
                            ) : (
                                <span className="size-placeholder">Sin talles</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPreview;