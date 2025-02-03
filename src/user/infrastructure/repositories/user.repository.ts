import { IUserRepository } from '../../application/interfaces/user_repository.interface';
import { User } from '../../domain/user.entity';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from '../../../core/application/dto/pagination.dto';

const prisma = new PrismaClient();

export default class UserRepository implements IUserRepository {
  /**
   * Buscar usuario por nombre de usuario
   */
  async findByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    return user ? this.mapToEntity(user) : null;
  }

  /**
   * Buscar usuario por email
   */
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user ? this.mapToEntity(user) : null;
  }

  /**
   * Buscar usuario por ID
   */
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
        deleted_at: null, // Solo usuarios activos
      },
    });

    return user ? this.mapToEntity(user) : null;
  }

  /**
   * Crear usuario
   */
  async create(user: Partial<User>): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        username: user.username!,
        address: user.address ?? null,
        email: user.email!,
        password: user.password!,
        role: user.role ?? 1,
        is_active: user.is_active ?? true,
      },
    });

    return this.mapToEntity(createdUser);
  }

  /**
   * Actualizar usuario
   */
  async update(id: string, user: Partial<User>): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id }, // Solo usuarios activos
      data: {
        username: user.username,
        email: user.email,
        address: user.address ?? null,
        password: user.password,
        role: user.role ?? 1,
        is_active: user.is_active ?? true,
      },
    });

    return this.mapToEntity(updatedUser);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    await prisma.user.update({
      where: { id },
      data: { deleted_at: new Date() }, // Borrado lógico
    });
  }

  /**
   * Obtener lista de usuarios con paginación
   */
  async listAll(pagination: PaginationDto): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: { deleted_at: null }, // Solo usuarios activos
      skip: pagination.offset,
      take: pagination.limit,
      orderBy: { created_at: 'desc' },
    });

    return users.map(this.mapToEntity);
  }

  /**
   * Mapear datos de Prisma a Entidad de Usuario
   */
  private mapToEntity(user: any): User {
    return new User({
      id: user.id,
      username: user.username,
      address: user.address ?? undefined,
      email: user.email,
      password: user.password,
      is_active: user.is_active ?? true,
      role: user.role ?? 1,
      created_at: user.created_at,
      updated_at: user.updated_at,
      deleted_at: user.deleted_at ?? undefined,
    });
  }
}
