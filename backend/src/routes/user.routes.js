import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {  getUserProfile, updateProfile} from '../controllers/user.controller.js';
import { addFavorite, removeFavorite } from '../controllers/favorite.controller.js';
import { deleteAddress, setPrincipalAddress, updateAddress, addAddress } from '../controllers/address.controller.js';

const router = Router();

//trae el perfil completo del usuario (datos + carrito + favoritos + compras)
router.get('/profile', authRequired, getUserProfile);

// PUT: Guarda los cambios cuando el usuario aprieta "Guardar Cambios"
router.put('/profile', authRequired, updateProfile);

// POST: Agrega una dirección nueva al usuario
router.post('/profile/address', authRequired, addAddress);

// PUT: Define una dirección como "Principal"
router.put('/profile/address/:idDireccion/principal', authRequired, setPrincipalAddress);

// DELETE: Elimina una dirección del usuario
router.delete('/profile/address/:idDireccion', authRequired, deleteAddress);

// PUT: Edita una dirección existente
router.put('/profile/address/:idDireccion', authRequired, updateAddress);

// DELETE: Elimina un producto de favoritos
router.delete('/profile/favorites/:idProducto', authRequired, removeFavorite);

//Post: Agrega un producto a favoritos
router.post('/profile/favorites', authRequired, addFavorite);


export default router;