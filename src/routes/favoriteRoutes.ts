import { Router } from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controllers/favoriteController';

const router = Router();

// Ruta: POST /api/v1/favorites (Para agregar un favorito)
router.post('/', addFavorite);

// Ruta: DELETE /api/v1/favorites (Para aplicar el soft-delete a un favorito)
router.delete('/', removeFavorite);

// Ruta: GET /api/v1/favorites/:userId (Para obtener la lista de favoritos de un usuario)
router.get('/:userId', getFavorites);

export default router;