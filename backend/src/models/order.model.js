import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        nombre: String, // Guardamos el nombre y foto por si el producto se borra de la tienda mañana
        imagen: String,
        talle: String,
        cantidad: Number,
        precio: Number
    }],
    totalInfo: {
        subtotal: Number,
        envio: Number,
        totalFinal: Number
    },
    direccionEnvio: {
        calle: String,
        ciudad: String,
        provincia: String,
        codigoPostal: String
    },
    estado: { 
        type: String, 
        enum: ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'],
        default: 'pendiente'
    }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);