import { Request, Response, NextFunction } from 'express';
import { IUserService } from '../../domain/user.interface';
import { PaginationDto } from '../../../core/application/dto/pagination.dto';
import { ValidationError } from '../../../core/infrastructure/errors/custom_errors/validation.error';

export class UserController {
  constructor(private readonly userService: IUserService) {}

  /**
   * Actualizar un usuario
   */
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updatedUser = await this.userService.updateUser(id, req.body);

      res.status(200).json({
        status: 200,
        message: 'User updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Eliminar un usuario (borrado lógico)
   */
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await this.userService.deleteUser(id);

      res.status(200).json({
        status: 200,
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtener lista de usuarios con paginación
   */
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const offset = Number(req.query.offset) || 0;
      const limit = Number(req.query.limit) || 10;

      if (isNaN(offset) || isNaN(limit) || offset < 0 || limit < 1) {
        throw new ValidationError('Invalid pagination parameters');
      }

      const pagination: PaginationDto = { offset, limit };
      const users = await this.userService.getAllUsers(pagination);

      res.status(200).json({
        status: 200,
        message: 'Users retrieved successfully',
        users,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtener un usuario por ID
   */
  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.userService.getCurrentUser(id);

      if (!user) {
        return res.status(404).json({
          error: 'NotFoundError',
          message: 'User not found',
          statusCode: 404,
        });
      }

      res.status(200).json({
        status: 200,
        message: 'User retrieved successfully',
        user,
      });
    } catch (error) {
      next(error);
    }
  }
}
