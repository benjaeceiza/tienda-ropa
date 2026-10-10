import { Router } from 'express';
import { getPublicProducts, getProduct} from '../controllers/product.controller.js';

const router = Router();


router.get('/', getPublicProducts);


export default router;