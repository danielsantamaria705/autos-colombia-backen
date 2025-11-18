import { Request, Response } from 'express';
import { CeldaService } from '../services/celda.service';

export class CeldaController {
    public async fetchAvailableCells(req: Request, res: Response): Promise<Response> {
        try {
            const celdaService = new CeldaService();
            const celdasDisponibles = await celdaService.getAvailableCells();
            return res.status(200).json(celdasDisponibles);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al obtener celdas disponibles', error: msg });
        }
    }

    public async obtenerCeldas(req: Request, res: Response): Promise<Response> {
        try {
            const celdaService = new CeldaService();
            const celdas = await celdaService.getAllCells();
            return res.status(200).json(celdas);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al obtener celdas', error: msg });
        }
    }

    public async obtenerCeldaPorId(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const celdaService = new CeldaService();
            const celda = await celdaService.getCellById(Number(id));

            if (!celda) {
                return res.status(404).json({ message: 'Celda no encontrada' });
            }

            return res.status(200).json(celda);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al obtener celda', error: msg });
        }
    }

    public async crearCelda(req: Request, res: Response): Promise<Response> {
        try {
            const celdaData = req.body;
            const celdaService = new CeldaService();
            const nuevaCelda = await celdaService.createCell(celdaData);
            return res.status(201).json(nuevaCelda);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al crear celda', error: msg });
        }
    }

    public async actualizarCelda(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const celdaData = req.body;
            const celdaService = new CeldaService();
            const celdaActualizada = await celdaService.updateCell(Number(id), celdaData);

            if (!celdaActualizada) {
                return res.status(404).json({ message: 'Celda no encontrada' });
            }

            return res.status(200).json(celdaActualizada);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al actualizar celda', error: msg });
        }
    }

    public async eliminarCelda(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const celdaService = new CeldaService();
            const resultado = await celdaService.deleteCell(Number(id));

            if (!resultado) {
                return res.status(404).json({ message: 'Celda no encontrada' });
            }

            return res.status(204).send();
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al eliminar celda', error: msg });
        }
    }
}

export const celdaController = new CeldaController();