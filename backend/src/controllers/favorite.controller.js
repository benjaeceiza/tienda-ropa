import User from '../models/user.model.js';

// Eliminar un producto de favoritos
export const removeFavorite = async (req, res) => {
    try {
        const { idProducto } = req.params;
        
        // $pull saca el ID del producto del array de favoritos
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { favoritos: idProducto } },
            { new: true }
        )
        .select("-password")
        .populate('favoritos')
        .populate('misCompras')
        .populate({ path: 'carrito', populate: { path: 'items.producto' } });

        res.json(user);
    } catch (error) {
        console.error("Error al eliminar favorito:", error);
        res.status(500).json({ message: "Error al eliminar de favoritos" });
    }
};


// Agregar un producto a favoritos
export const addFavorite = async (req, res) => {
    try {
        const { idProducto } = req.body;
        
        // $addToSet es MAGIA pura: agrega el ID al array SOLO si no existe todavía (evita duplicados)
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $addToSet: { favoritos: idProducto } }, 
            { new: true }
        )
        .select("-password")
        .populate('favoritos')
        .populate('misCompras')
        .populate({ path: 'carrito', populate: { path: 'items.producto' } });

        res.json(user);
    } catch (error) {
        console.error("Error al agregar favorito:", error);
        res.status(500).json({ message: "Error al agregar a favoritos" });
    }
};