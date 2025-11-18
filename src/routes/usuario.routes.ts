import { Router } from 'express';
import { usuarioController } from '../controllers/usuario.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

/**
 * @openapi
 * /api/usuario/profile:
 *   get:
 *     tags:
 *       - Usuario
 *     summary: Obtener perfil del usuario actual
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *       401:
 *         description: No autorizado
 */
router.get('/profile', authMiddleware, (req, res) => usuarioController.fetchUserProfile(req, res));

export default router;