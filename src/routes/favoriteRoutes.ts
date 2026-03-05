import { Router } from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controllers/favoriteController';

const router = Router();

router.post('/', addFavorite);

router.delete('/', removeFavorite);

router.get('/:userId', getFavorites);

export default router;