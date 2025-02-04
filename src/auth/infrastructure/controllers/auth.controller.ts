import { Request, Response, NextFunction } from 'express';
import { IAuthService } from '../../domain/auth.interface';
import { SuccessResponse } from '../../application/dto/response_login.dto';
import { User } from '../../../user/domain/user.entity';

export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body as {
        username: string;
        password: string;
      };

      const response = await this.authService.login({
        username,
        password,
      });

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      next(error); // ✅ Enviamos el error al `errorHandler`
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, email, address, role } = req.body as {
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

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      next(error); // ✅ Enviamos el error al `errorHandler`
    }
  }
}
