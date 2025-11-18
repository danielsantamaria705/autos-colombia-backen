import { Request, Response, NextFunction } from 'express';

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Email y contraseña son requeridos' });
        return;
    }

    if (typeof email !== 'string' || !email.includes('@')) {
        res.status(400).json({ message: 'Email inválido' });
        return;
    }

    if (typeof password !== 'string' || password.length < 6) {
        res.status(400).json({ message: 'Contraseña debe tener al menos 6 caracteres' });
        return;
    }

    next();
};

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
    const { nombre, email, password, id_rol } = req.body;

    if (!nombre || !email || !password || !id_rol) {
        res.status(400).json({ message: 'Nombre, email, contraseña e id_rol son requeridos' });
        return;
    }

    if (typeof nombre !== 'string' || nombre.trim().length === 0) {
        res.status(400).json({ message: 'Nombre inválido' });
        return;
    }

    if (typeof email !== 'string' || !email.includes('@')) {
        res.status(400).json({ message: 'Email inválido' });
        return;
    }

    if (typeof password !== 'string' || password.length < 6) {
        res.status(400).json({ message: 'Contraseña debe tener al menos 6 caracteres' });
        return;
    }

    if (typeof id_rol !== 'number' || id_rol <= 0) {
        res.status(400).json({ message: 'id_rol inválido' });
        return;
    }

    next();
};

export default validateLogin;