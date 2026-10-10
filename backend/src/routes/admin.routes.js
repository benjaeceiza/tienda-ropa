import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { createProduct, deleteProduct, getAdminProducts, getProductById, toggleProductStatus, updateProduct } from '../controllers/product-admin.controller.js';
import { upload } from '../middlewares/upload.js';
// Acá importarías tus controladores de admin, por ejemplo:
// import { getAllUsers, getDashboardStats } from '../controllers/admin.controller.js';

const router = Router();

// Al poner esto acá arriba, TODAS las rutas que estén 
// por debajo de esta línea van a requerir estar logueado y ser ADMIN.
router.use(authRequired, isAdmin);




// Usuarios
// router.get('/users', getAllUsers); // Ver todos los usuarios
// router.delete('/users/:id', deleteUser); // Banear/borrar usuario


// Productos (ABM Exclusivo del admin)
router.put('/productos/:id', authRequired, isAdmin, upload.array('nuevasImagenes'), updateProduct);
router.patch('/productos/:id/estado',authRequired,isAdmin, toggleProductStatus);
router.get('/productos/:id', authRequired, isAdmin, getProductById);
router.delete('/productos/:id',authRequired,isAdmin, deleteProduct);
router.get('/productos', authRequired, isAdmin, getAdminProducts);
router.post('/productos', authRequired, isAdmin, upload.array('imagenes', 10), createProduct);


// Órdenes / Ventas
// router.get('/orders', getAllOrders); // Ver todas las ventas
// router.put('/orders/:id/status', updateOrderStatus); // Cambiar estado a "Enviado"

// Estadísticas para el Dashboard
// router.get('/stats', getDashboardStats);

export default router;