import { CreateUserDto } from '../../user/application/dto/user.dto';
import { User } from '../../user/domain/user.entity';
import { ResponseLoginDto } from '../application/dto/response_login.dto';
import LoginDto from './auth.entity';

export interface IAuthService {
  login(login_dto: LoginDto): Promise<ResponseLoginDto>;
  register(user: CreateUserDto): Promise<Partial<User>>;
}
