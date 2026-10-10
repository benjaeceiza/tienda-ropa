import User from "../models/user.model.js";
import Cart from '../models/cart.model.js'; 
import bcrypt from 'bcryptjs'; // (o bcrypt)
import jwt from 'jsonwebtoken';


// --- REGISTRO ---
export const register = async (req, res) => {
  try {
    const { nombre, apellido, telefono, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const userNumberExists = await User.findOne({ telefono });
    if (userNumberExists) {
      return res.status(400).json({ message: 'El número de teléfono ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creamos el usuario en memoria (Mongoose ya le asigna un _id acá)
    const newUser = new User({
      nombre,
      apellido,
      telefono,
      email,
      password: hashedPassword
    });
    
    // --- (NUEVO) CREACIÓN DEL CARRITO ---
    // Creamos el carrito vacío y lo enlazamos al _id del usuario recién creado
    const newCart = new Cart({
        usuario: newUser._id,
        items: [],
        total: 0
    });
    
    // Guardamos el carrito en la base de datos
    await newCart.save();

    // Le asignamos el ID del carrito al usuario
    newUser.carrito = newCart._id;
    // ------------------------------------

    // Ahora sí, guardamos el usuario con el carrito ya referenciado
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, rol: newUser.rol, nombre: newUser.nombre }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' } 
    );
 
    res.cookie('token', token, {
      httpOnly: true, // Inaccesible desde JavaScript del lado del cliente
      secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
      sameSite: 'lax', // Permite envío de cookies en el mismo dominio/localhost
      maxAge: 24 * 60 * 60 * 1000 // 1 día en milisegundos
    });

    res.status(201).json({
        message: 'Usuario registrado con éxito',
        user: { 
            id: newUser._id, 
            nombre: newUser.nombre, 
            apellido: newUser.apellido, 
            telefono: newUser.telefono, 
            email: newUser.email, 
            rol: newUser.rol,
            carrito: newUser.carrito // (NUEVO) Mandamos el ID del carrito al front por las dudas
        }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor al registrar usuario' });
  }
};

// --- LOGIN ---
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Buscamos al usuario por su email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // 2. Comparamos la contraseña que mandó con la encriptada en la DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // 3. Generamos el JWT
    const token = jwt.sign(
      { id: user._id, rol: user.rol }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

      res.cookie('token', token, {
      httpOnly: true, // Inaccesible desde JavaScript del lado del cliente
      secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
      sameSite: 'lax', // Permite envío de cookies en el mismo dominio/localhost
      maxAge: 24 * 60 * 60 * 1000 // 1 día en milisegundos
    });

    // 4. Respondemos con éxito
    res.status(200).json({
      message: 'Login exitoso',
      user: { id: user._id, nombre: user.nombre, email: user.email, rol: user.rol },

    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor al iniciar sesión' });
  }
};


// --- VERIFICAR SESIÓN (La que llama React) ---
export const verifyToken = async (req, res) => {
  try {
    const { token } = req.cookies; // Gracias a cookie-parser leemos la cookie
    
    // Si no hay token, no está logueado
    if (!token) return res.status(401).json({ message: 'No autorizado' });

    // Si hay token, lo verificamos
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Token inválido' });

      // Buscamos al usuario real en la base de datos
      const userFound = await User.findById(decoded.id);
      if (!userFound) return res.status(401).json({ message: 'No autorizado' });

      // Le devolvemos los datos a React
      return res.json({
        id: userFound._id,
        nombre: userFound.nombre,
        apellido: userFound.apellido,
        telefono: userFound.telefono,
        email: userFound.email,
        rol: userFound.rol
      });
    });

  } catch (error) {
    res.status(500).json({ message: 'Error al verificar token' });
  }
};


export const logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0) // Le ponemos fecha de expiración en el pasado para que el navegador la borre
    });
    return res.sendStatus(200);
};