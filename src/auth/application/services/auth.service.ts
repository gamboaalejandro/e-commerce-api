import { FastifyInstance } from 'fastify';
import { ResponseLoginDto } from '../dto/response_login.dto';
import { IAuthService } from '../../domain/auth.interface';
import LoginDto from '../../domain/auth.entity';
import { CreateUserDto } from '../../../user/application/dto/user.dto';
import { IUserRepository } from '../../../user/application/interfaces/user_repository.interface';
import { User } from '../../../user/domain/user.entity';
import { ConflictError } from '../../../core/infrastructure/errors/custom_errors/conflict.error';
import bcrypt from 'bcrypt';
export class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly fastify: FastifyInstance
  ) {}

  async login(login_dto: LoginDto): Promise<ResponseLoginDto> {
    const user = await this.userRepository.findByUsername(login_dto.username);
    if (!user) {
      throw new ConflictError('User not found');
    }
    const isValidPassword = bcrypt.compareSync(
      login_dto.password,
      user.password
    );
    if (!isValidPassword) {
      throw new ConflictError('Invalid password');
    }

    const token = this.fastify.jwt.sign({
      username: login_dto.username,
      password: login_dto.password,
    });
    const respon = new ResponseLoginDto(token);
    console.log(respon);
    return Promise.resolve(new ResponseLoginDto(token));
  }
  async register(user: CreateUserDto): Promise<Partial<User>> {
    const user_email = await this.userRepository.findByEmail(user.email);
    if (user_email) {
      throw new ConflictError('User email already exists');
    }
    const user_username = await this.userRepository.findByUsername(
      user.username
    );
    if (user_username) {
      throw new ConflictError('Username already exists');
    }

    //assign password encrypted
    user.password = await bcrypt.hash(user.password, 10);

    return Promise.resolve(this.userRepository.create(user));
  }
}
