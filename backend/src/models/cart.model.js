import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    usuario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Referencia al dueño del carrito
        required: true 
    },
    items: [{
        producto: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product',
            required: true
        },
        talle: { type: String, required: true },
        cantidad: { type: Number, required: true, default: 1 },
        precioUnitario: { type: Number, required: true } 
    }],
    total: { type: Number, default: 0 }
}, {
    timestamps: true
});

export default mongoose.model('Cart', cartSchema);