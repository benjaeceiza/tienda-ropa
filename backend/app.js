import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRouter from './src/routes/auth.routes.js';
import productRoutes from './src/routes/product.routes.js';
import userRouter from './src/routes/user.routes.js';
import adminRouter from './src/routes/admin.routes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: `${process.env.FRONTEND_URL}`, 
  credentials: true // <--  Permite que viajen las cookies
}));


app.use(morgan('dev'));
app.use(express.json()); 
app.use(cookieParser());



app.use('/api/auth', authRouter);
app.use('/api/products', productRoutes);
app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);


app.get('/api/ping', (req, res) => {
  res.json({ message: '¡API de STRETEAT funcionando flama! 🚀' });
});

export default app;