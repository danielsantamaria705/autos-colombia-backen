import { Router } from 'express';
import { celdaController } from '../controllers/celda.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

/**
 * @openapi
 * /api/celda/available:
 *   get:
 *     tags:
 *       - Celda
 *     summary: Obtener celdas disponibles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de celdas disponibles
 *       401:
 *         description: No autorizado
 */
router.get('/available', authMiddleware, (req, res) => celdaController.fetchAvailableCells(req, res));

export default router;