import { IUserService } from '../domain/user.interface';
import { IUserRepository } from './interfaces/user_repository.interface';
import { User } from '../domain/user.entity';
import { UpdateUserDto } from './dto/user-update.dto';
import { PaginationDto } from '../../core/application/dto/pagination.dto';
import { ValidationError } from '../../core/infrastructure/errors/custom_errors/validation.error';

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}
  getAllUsers(pagination: PaginationDto): Promise<User[]> {
    console.log(pagination);
    throw new ValidationError('METODO NO IMPLEMENTADO');
  }
  getCurrentUser(id: string): Promise<User> {
    console.log(id);

    throw new Error('Method not implemented.');
  }
  updateUser(id: string, user: UpdateUserDto): Promise<User> {
    console.log(id);
    console.log(user);
    throw new Error('Method not implemented.');
  }
  deleteUser(id: string): Promise<void> {
    console.log(id);

    throw new Error('Method not implemented.');
  }
}
