import { getRepository } from 'typeorm';
import { Usuario } from '../models/entities/Usuario';

export class UsuarioService {
    async getUserProfile(userId: number): Promise<Usuario | null> {
        const repo = getRepository(Usuario);
        const usuario = await repo.findOne({
            where: { id_usuario: userId },
            relations: ['rol'],
        });
        return usuario ?? null;
    }

    async getAllUsers(): Promise<Usuario[]> {
        const repo = getRepository(Usuario);
        return await repo.find({ relations: ['rol'] });
    }

    async getUserById(id: number): Promise<Usuario | null> {
        const repo = getRepository(Usuario);
        const usuario = await repo.findOne({
            where: { id_usuario: id },
            relations: ['rol'],
        });
        return usuario ?? null;
    }

    async updateUser(id: number, userData: Partial<Usuario>): Promise<Usuario | null> {
        const repo = getRepository(Usuario);
        const usuario = await repo.findOne({ where: { id_usuario: id } });

        if (!usuario) return null;

        repo.merge(usuario, userData);
        return await repo.save(usuario);
    }

    async deleteUser(id: number): Promise<boolean> {
        const repo = getRepository(Usuario);
        const usuario = await repo.findOne({ where: { id_usuario: id } });

        if (!usuario) return false;

        await repo.remove(usuario);
        return true;
    }
}