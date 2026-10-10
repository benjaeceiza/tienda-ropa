import Product from '../models/product.model.js'; 

export const getPublicProducts = async (req, res) => {
    try {

        const productos = await Product.find({ activo: true });

        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al cargar los productos' });
    }
};

// 2. OBTENER UN SOLO PRODUCTO POR ID
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error al buscar el producto" });
    }
};

