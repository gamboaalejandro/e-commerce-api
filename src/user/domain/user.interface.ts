import { UpdateUserDto } from '../application/dto/user-update.dto';
import { User } from './user.entity';
import { PaginationDto } from '../../core/application/dto/pagination.dto';

export interface IUserService {
  updateUser(id: string, user: UpdateUserDto): Promise<User>;
  deleteUser(id: string): Promise<void>;
  getAllUsers(pagination: PaginationDto): Promise<User[]>;
  getCurrentUser(id: string): Promise<User>;
}
