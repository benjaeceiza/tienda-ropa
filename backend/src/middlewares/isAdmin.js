import User from "../models/user.model.js"

export const isAdmin = async (req, res, next) => {
    try {
        // 1. Agarramos el ID del usuario.
   
        const userId = req.user.id; 

        // 2. Buscamos al usuario en la base de datos
        const userFound = await User.findById(userId);

        // 3. Validaciones de seguridad
        if (!userFound) {
            return res.status(404).json({ message: "Usuario no encontrado en la base de datos." });
        }

        if (userFound.rol !== 'admin') {
            return res.status(403).json({ 
                message: "Acceso denegado. Este panel es exclusivo para administradores de STRETEAT." 
            });
        }

        // 4. Si llegó hasta acá, es porque es el jefe. Le abrimos la puerta.
        next();
        
    } catch (error) {
        console.error("Error en middleware isAdmin:", error);
        return res.status(500).json({ message: "Error interno al verificar permisos de administrador." });
    }
};