import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  imagen: {
    type: String,
    required: true
  },
  imagenes: [{ type: String }],
  categoria: {
    type: String,
    required: true,
    enum: ['hoodies', 'remeras', 'pantalones', 'calzados', 'accesorios']
  },

  stock: {
    type: Map,
    of: Number,
    default: {}
  },
  destacado: {
    type: Boolean,
    default: false
  },
  descuento: {
    type: Number,
    default: 0 // Porcentaje, ej: 15 para 15% OFF
  },
  activo: {
    type: Boolean,
    default: true // Para la "baja lógica" sin borrarlo de la base
  }
}, {
  timestamps: true
});

export default model('Product', productSchema);