import { PaginationDto } from '../../../core/application/dto/pagination.dto';
import { User } from '../../domain/user.entity';

export interface IUserRepository {
  create(user: Partial<User>): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
  listAll(pagination: PaginationDto): Promise<User[]>;
}
