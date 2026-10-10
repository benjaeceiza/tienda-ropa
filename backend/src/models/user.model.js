import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    telefono: { type: String, default: "" }, // Nuevo
    rol: { type: String, enum: ['user', 'admin'], default: 'user' },

    // Libreta de direcciones (Puede tener varias)
    direcciones: [{
        calle: { type: String, required: true },
        numero: { type: String, required: true },
        pisoDepto: { type: String, default: "" }, 
        barrio: { type: String, required: true }, 
        ciudad: { type: String, required: true },
        provincia: { type: String, required: true },
        codigoPostal: { type: String, required: true },
        esPrincipal: { type: Boolean, default: false }
    }],
    // Wishlist: Un array de IDs de productos
    favoritos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],

    // Historial: Un array de IDs de Órdenes de compra
    misCompras: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],

    // El Carrito activo de este usuario
    carrito: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }

}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);