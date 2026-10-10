
import User from '../models/user.model.js';

// Agregar una dirección nueva
export const addAddress = async (req, res) => {
    try {
        const { calle, numero, pisoDepto, barrio, ciudad, provincia, codigoPostal } = req.body;

        const user = await User.findById(req.user.id);

        // Si es la PRIMERA dirección que agrega, la hacemos principal por defecto
        const esPrimera = user.direcciones.length === 0;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {
                $push: {
                    direcciones: { calle, numero, pisoDepto, barrio, ciudad, provincia, codigoPostal, esPrincipal: esPrimera }
                }
            },
            { new: true }
        ).select("-password");

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al agregar dirección" });
    }
};

// Definir una dirección como "Principal"
export const setPrincipalAddress = async (req, res) => {
    try {
        const { idDireccion } = req.params; // El _id de la dirección específica

        // Paso 1: Ponemos TODAS las direcciones en "esPrincipal: false"
        await User.updateMany(
            { _id: req.user.id },
            { $set: { "direcciones.$[].esPrincipal": false } }
        );

        // Paso 2: Ponemos solo la que elegimos en "esPrincipal: true"
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.user.id, "direcciones._id": idDireccion },
            { $set: { "direcciones.$.esPrincipal": true } },
            { new: true }
        ).select("-password");

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al cambiar dirección principal" });
    }
};


// Eliminar una dirección
export const deleteAddress = async (req, res) => {
    try {
        const { idDireccion } = req.params;

        // $pull saca del array el objeto que coincida con ese ID
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { direcciones: { _id: idDireccion } } },
            { new: true }
        ).select("-password");

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la dirección" });
    }
};

// Editar una dirección
export const updateAddress = async (req, res) => {
    try {
        const { idDireccion } = req.params;
        const { calle, numero, pisoDepto, barrio, ciudad, provincia, codigoPostal } = req.body;

        // Buscamos al usuario Y a la dirección específica dentro del array
        const user = await User.findOneAndUpdate(
            { _id: req.user.id, "direcciones._id": idDireccion },
            {
                $set: {
                    "direcciones.$.calle": calle,
                    "direcciones.$.numero": numero,
                    "direcciones.$.pisoDepto": pisoDepto,
                    "direcciones.$.barrio": barrio,
                    "direcciones.$.ciudad": ciudad,
                    "direcciones.$.provincia": provincia,
                    "direcciones.$.codigoPostal": codigoPostal
                }
            },
            { new: true }
        ).select("-password");

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la dirección" });
    }
};

