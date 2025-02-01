import { Router } from 'express';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from '../application/services/auth.service';
import UserRepository from '../../user/infrastructure/repositories/user.repository';
import {
  createUserValidator,
  loginUserValidator,
} from '../../user/application/validations/validation.schema';
import { validateRequest } from '../../core/application/validate_request';

const authRouter = Router();

// 📌 Instancias de dependencias
const userRepositoryInstance = new UserRepository();
const authServiceInstance = new AuthService(userRepositoryInstance);
const authControllerInstance = new AuthController(authServiceInstance);

// 📌 Definición de rutas
authRouter.post(
  '/login',
  loginUserValidator,
  validateRequest,
  authControllerInstance.login.bind(authControllerInstance)
);

authRouter.post(
  '/register',
  createUserValidator,
  validateRequest,
  authControllerInstance.register.bind(authControllerInstance)
);

export default authRouter;
