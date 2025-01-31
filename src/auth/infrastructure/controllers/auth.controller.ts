import { FastifyReply, FastifyRequest } from 'fastify';
import { IAuthService } from '../../domain/auth.interface';
import { SuccessResponse } from '../../application/dto/response_login.dto';
import { User } from '../../../user/domain/user.entity';

export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { username, password } = request.body as {
        username: string;
        password: string;
      };
      const response = await this.authService.login({
        username: username,
        password: password,
      });
      return reply.code(200).send(JSON.stringify(response, null, 2));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { username, password, email, address, role } = request.body as {
        username: string;
        password: string;
        email: string;
        address: string;
        role: number;
      };

      const user = await this.authService.register({
        username,
        password,
        email,
        address,
        role,
      });

      const response = new SuccessResponse<Partial<User>>(user);

      reply.send(JSON.stringify(response, null, 2));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
