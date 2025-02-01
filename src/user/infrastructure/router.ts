import { Router } from 'express';
import UserRepository from './repositories/user.repository';
import { UserController } from './controllers/user.controller';
import { UserService } from '../application/user.service';
import {
  updateUserValidator,
  deleteUserValidator,
  getAllUsersValidator,
  getCurrentUserValidator,
} from '../application/validations/validation.schema';
import { validateRequest } from '../../core/application/validate_request';
import { authenticateJWT } from '../../core/infrastructure/middleware/jwt.middleware';
import { authorizeRole } from '../../core/infrastructure/middleware/authorization.middleware';

const userRouter = Router();

const userRepositoryInstance = new UserRepository();
const userServiceInstance = new UserService(userRepositoryInstance);
const userControllerInstance = new UserController(userServiceInstance);

// Rutas para actualizar y eliminar usuario
userRouter.post(
  '/update/:id',
  authenticateJWT,
  authorizeRole([1]),
  updateUserValidator,
  validateRequest,
  userControllerInstance.updateUser.bind(userControllerInstance)
);

userRouter.delete(
  '/delete/:id',
  authenticateJWT,
  authorizeRole([1]),
  deleteUserValidator,
  validateRequest,
  userControllerInstance.deleteUser.bind(userControllerInstance)
);

// Obtener todos los usuarios con paginación
userRouter.get(
  '/',
  authenticateJWT,
  authorizeRole([1]),
  getAllUsersValidator,
  validateRequest,
  userControllerInstance.getAllUsers.bind(userControllerInstance)
);

// Obtener un usuario por ID
userRouter.get(
  '/:id',
  authenticateJWT,
  authorizeRole([1, 2]),
  getCurrentUserValidator,
  validateRequest,
  userControllerInstance.getCurrentUser.bind(userControllerInstance)
);

export default userRouter;
