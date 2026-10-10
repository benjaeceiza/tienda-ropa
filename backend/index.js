import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI,{ dbName: 'streteat'})
  .then(() => {
    console.log('🔥 Base de datos conectada a MongoDB');
    

    app.listen(PORT, () => {
      console.log(`🚀 Servidor de STRETEAT corriendo en el puerto ${PORT}`);
    });
  })

  .catch((error) => {
    console.error('❌ Error fatal conectando a la base de datos:', error);
  });