import { FastifyInstance } from 'fastify';
import UserRepository from './repositories/user.repository';
import { UserController } from './controllers/user.controller';
import { UserService } from '../application/user.service';
import {
  deleteUserSchema,
  getAllUsersSchema,
  getCurrentUserSchema,
  updateUserSchema,
} from '../application/validations/validation.schema';

export async function registerUserRoutes(fastify: FastifyInstance) {
  const userRepositoryInstance = new UserRepository();
  const userServiceInstance = new UserService(userRepositoryInstance, fastify);
  const userControllerInstance = new UserController(userServiceInstance);

  fastify.post(
    '/update/:id',
    {
      schema: updateUserSchema,
    },
    userControllerInstance.updateUser.bind(userControllerInstance)
  );
  fastify.post(
    '/delete/:id',
    {
      schema: deleteUserSchema,
    },
    userControllerInstance.deleteUser.bind(userControllerInstance)
  );

  // Obtener todos los usuarios con paginación
  fastify.get(
    '/',
    { schema: getAllUsersSchema },
    userControllerInstance.getAllUsers.bind(userControllerInstance)
  );

  // Obtener un usuario por ID
  fastify.get(
    '/:id',
    { schema: getCurrentUserSchema },
    userControllerInstance.getCurrentUser.bind(userControllerInstance)
  );
}
