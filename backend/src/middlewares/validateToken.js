import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authRequired = (req, res, next) => {
    // 1. Buscamos el token adentro de las cookies del usuario
    const { token } = req.cookies;

    // 2. Si no trae la cookie, lo rebotamos directo (Error 401: No autorizado)
    if (!token) {
        return res.status(401).json({ message: "No hay token, autorización denegada. Iniciá sesión." });
    }

    // 3. Si trae la cookie, verificamos que no sea falsa ni esté vencida
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if (err) {
            // Error 403: Prohibido (El token existe pero fue modificado o expiró)
            return res.status(403).json({ message: "Token inválido o expirado." });
        }

        //Si el token es real, le "pegamos" los datos del usuario a la request.
        // Así, cuando la petición llegue a tu controlador (ej: getUserProfile), 
        // vas a poder hacer "req.user.id" y saber exactamente quién es.
        req.user = decodedUser;

        // 5. Le abrimos la puerta para que pase al controlador
        next();
    });
};