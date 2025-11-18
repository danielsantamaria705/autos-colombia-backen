import { getRepository } from 'typeorm';
import { Celda } from '../models/entities/Celda';
import { EstadoCeldaEnum } from '../enums/estado-celda.enum';

export class CeldaService {
    async getAvailableCells(): Promise<Celda[]> {
        const repo = getRepository(Celda);
        
        // Buscar celdas donde el estado sea Disponible
        const celdas = await repo
            .createQueryBuilder('celda')
            .where('celda.id_estado = :estadoId', { estadoId: EstadoCeldaEnum.Disponible })
            .getMany();
        
        return celdas;
    }

    async getAllCells(): Promise<Celda[]> {
        const repo = getRepository(Celda);
        return await repo
            .createQueryBuilder('celda')
            .getMany();
    }

    async getCellById(id: number): Promise<Celda | null> {
        const repo = getRepository(Celda);
        const celda = await repo
            .createQueryBuilder('celda')
            .where('celda.id_celda = :id', { id })
            .getOne();
        
        return celda ?? null;
    }

    async createCell(celdaData: Partial<Celda>): Promise<Celda> {
        const repo = getRepository(Celda);
        const nuevaCelda = repo.create(celdaData as Celda);
        return await repo.save(nuevaCelda);
    }

    async updateCell(id: number, celdaData: Partial<Celda>): Promise<Celda | null> {
        const repo = getRepository(Celda);
        const celda = await repo.findOne({ where: { id_celda: id } });

        if (!celda) return null;

        repo.merge(celda, celdaData);
        return await repo.save(celda);
    }

    async deleteCell(id: number): Promise<boolean> {
        const repo = getRepository(Celda);
        const celda = await repo.findOne({ where: { id_celda: id } });

        if (!celda) return false;

        await repo.remove(celda);
        return true;
    }
}