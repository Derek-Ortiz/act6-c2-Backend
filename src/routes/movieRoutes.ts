import { Router } from 'express';
import { getMovies } from '../controllers/movieController';

const router = Router();

// Ruta: GET /api/v1/movies
router.get('/', getMovies);

export default router;