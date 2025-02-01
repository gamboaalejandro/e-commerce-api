import { Request, Response, NextFunction } from 'express';
import { IUserService } from '../../domain/user.interface';
import { PaginationDto } from '../../../core/application/dto/pagination.dto';

export class UserController {
  constructor(private readonly userService: IUserService) {}

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({ message: 'User updated' });
    } catch (error) {
      console.error(error);
      next(error); // ✅ Usa next() para que el middleware de errores lo maneje
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({ message: 'User deleted' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const offset = Number(req.query.offset) || 1; // ✅ Convierte a número y asigna un valor por defecto
      const limit = Number(req.query.limit) || 10; // ✅ Convierte a número y asigna un valor por defecto

      const pagination: PaginationDto = { offset: offset, limit: limit };

      const users = await this.userService.getAllUsers(pagination);
      res.json(users);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as { id: string };
      const user = await this.userService.getCurrentUser(id);

      if (!user) {
        res.status(404).json({
          error: 'NotFoundError',
          message: 'User not found',
          statusCode: 404,
        });
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}
