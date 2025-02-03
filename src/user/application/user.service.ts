import { IUserService } from '../domain/user.interface';
import { IUserRepository } from './interfaces/user_repository.interface';
import { User } from '../domain/user.entity';
import { UpdateUserDto } from './dto/user-update.dto';
import { PaginationDto } from '../../core/application/dto/pagination.dto';
import { ValidationError } from '../../core/infrastructure/errors/custom_errors/validation.error';
import { NotFoundError } from '../../core/infrastructure/errors/custom_errors/not_found.error';
import { ConflictError } from '../../core/infrastructure/errors/custom_errors/conflict.error';

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Obtener todos los usuarios con paginación
   */
  async getAllUsers(pagination: PaginationDto): Promise<User[]> {
    if (pagination.offset < 0 || pagination.limit <= 0) {
      throw new ValidationError('Offset y limit deben ser valores positivos.');
    }

    const users = await this.userRepository.listAll(pagination);
    if (!users.length) {
      throw new NotFoundError('No users found.');
    }

    return users;
  }

  /**
   * Obtener un usuario por ID
   */
  async getCurrentUser(id: string): Promise<User> {
    if (!id) {
      throw new ValidationError('User ID is required.');
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('User not found.');
    }

    return user;
  }

  /**
   * Actualizar un usuario
   */
  async updateUser(id: string, userDto: UpdateUserDto): Promise<User> {
    if (!id) {
      throw new ValidationError('User ID is required.');
    }

    if (userDto.email) {
      const existingUser = await this.userRepository.findByEmail(userDto.email);
      if (existingUser && existingUser.id !== id) {
        throw new ConflictError('Email already in use.');
      }
    }

    if (userDto.username) {
      const existingUser = await this.userRepository.findByUsername(
        userDto.username
      );
      if (existingUser && existingUser.id !== id) {
        throw new ConflictError('Username already taken.');
      }
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('User not found.');
    }

    const updatedUser = await this.userRepository.update(id, userDto);
    return updatedUser;
  }

  /**
   * Eliminar un usuario
   */
  async deleteUser(id: string): Promise<void> {
    if (!id) {
      throw new ValidationError('User ID is required.');
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('User not found.');
    }

    await this.userRepository.delete(id);
  }
}
