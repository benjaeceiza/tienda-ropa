import User from '../models/user.model.js';
import Cart from '../models/cart.model.js';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';


// Traer el perfil completo del usuario con su carrito, favoritos y compras
export const getUserProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id)
            .select('-password') // Sacamos la contraseña por seguridad
            .populate('favoritos') // Trae los datos reales de los productos en favoritos
            .populate('misCompras') // Trae el historial de órdenes
            .populate({
                path: 'carrito', // Trae el carrito
                populate: {
                    path: 'items.producto' // Y adentro del carrito, trae los datos de cada remera/zapa
                }
            });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error al obtener el perfil:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};



// Actualizar datos personales del usuario (nombre, apellido, teléfono)
export const updateProfile = async (req, res) => {
    try {
        const { nombre, apellido, telefono } = req.body;

        // --- VALIDACIÓN DE TELÉFONO ÚNICO ---
        if (telefono) {
            // Buscamos si existe ALGUIEN con ese teléfono, 
            // pero que su ID NO SEA ($ne) el del usuario que está logueado.
            const telefonoOcupado = await User.findOne({
                telefono: telefono,
                _id: { $ne: req.user.id }
            });

            if (telefonoOcupado) {
                // Si lo encuentra, frenamos todo y le avisamos al front
                return res.status(400).json({ message: "Ese número de teléfono ya está registrado en otra cuenta." });
            }
        }
        // ---------------------------------------------

        // Si pasó la validación, actualizamos normalmente
        const usuarioActualizado = await User.findByIdAndUpdate(
            req.user.id,
            { nombre, apellido, telefono },
            { new: true }
        )
            .select('-password')
            .populate('favoritos')
            .populate('misCompras')
            .populate({
                path: 'carrito',
                populate: { path: 'items.producto' }
            });

        if (!usuarioActualizado) {
            return res.status(404).json({ message: "Usuario no encontrado para actualizar" });
        }

        res.json(usuarioActualizado);

    } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        res.status(500).json({ message: "Error interno al actualizar datos" });
    }
};


