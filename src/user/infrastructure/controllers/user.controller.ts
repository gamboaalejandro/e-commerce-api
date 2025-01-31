import { FastifyReply, FastifyRequest } from 'fastify';
import { IUserService } from '../../domain/user.interface';
import { PaginationDto } from '../../../core/application/dto/pagination.dto';

export class UserController {
  constructor(private readonly userService: IUserService) {}

  async updateUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      return reply.code(200).send({ message: 'User updated' });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      reply.send({ message: 'User deleted' });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { offset = 1, limit = 10 } = request.query as {
        offset: number;
        limit: number;
      };
      const pagination: PaginationDto = { offset, limit };

      const users = await this.userService.getAllUsers(pagination);
      reply.send(users);
    } catch (error) {
      console.log(error);
      reply.status(500).send({ message: 'Error fetching users', error: error });
    }
  }

  async getCurrentUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const user = await this.userService.getCurrentUser(id);
      if (!user) {
        return reply.status(404).send({
          error: 'NotFoundError',
          message: 'User not found',
          statusCode: 404,
        });
      }
      reply.send(user);
    } catch (error) {
      reply.status(500).send({ message: 'Error fetching user', error: error });
    }
  }
}
