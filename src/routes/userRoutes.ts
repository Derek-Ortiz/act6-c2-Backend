import { Router } from 'express';
import { registerUser } from '../controllers/userController';

const router = Router();

// Ruta: POST /api/v1/users/register
router.post('/register', registerUser);

export default router;