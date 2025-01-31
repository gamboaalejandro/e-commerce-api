import { FastifyInstance } from 'fastify';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from '../application/services/auth.service';
import UserRepository from '../../user/infrastructure/repositories/user.repository';
import { createUserSchema } from '../../user/application/validations/validation.schema';
import { loginUserSchema } from '../application/dto/login.schema';

export async function registerAuthRoutes(fastify: FastifyInstance) {
  const userRepositoryInstance = new UserRepository();
  const authServiceInstance = new AuthService(userRepositoryInstance, fastify);
  const authControllerInstance = new AuthController(authServiceInstance);

  fastify.post(
    '/login',
    {
      schema: loginUserSchema,
    },
    authControllerInstance.login.bind(authControllerInstance)
  );
  fastify.post(
    '/register',
    {
      schema: createUserSchema,
    },
    authControllerInstance.register.bind(authControllerInstance)
  );
}
