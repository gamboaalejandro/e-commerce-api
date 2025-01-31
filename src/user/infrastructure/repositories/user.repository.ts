import { IUserRepository } from '../../application/interfaces/user_repository.interface';
import { User } from '../../domain/user.entity';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class UserRepository implements IUserRepository {
  async findByUsername(username: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { username },
    });
  }
  async create(user: Partial<User>): Promise<User> {
    return await prisma.user.create({
      data: {
        username: user.username!,
        address: user.address ?? null,
        email: user.email!,
        password: user.password!,
        role: user.role ?? 1,
        is_active: user.is_active ?? true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }
  async update(id: string, user: Partial<User>): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...user,
        address: user.address ?? null, // Convertir `undefined` a `null`
        role: user.role ?? 1, // Asegurar que no sea `null`
        is_active: user.is_active ?? true, // Convertir `null` a `true`
      },
    });

    return this.mapToEntity(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }

  async listAll(): Promise<User[]> {
    return await prisma.user.findMany({
      where: { deleted_at: null },
    });
  }

  private mapToEntity(user: any): User {
    return new User({
      id: user.id,
      username: user.username,
      address: user.address ?? undefined, // Convertir `null` a `undefined`
      email: user.email,
      password: user.password,
      is_active: user.is_active ?? true, // Convertir `null` a `true`
      role: user.role ?? 1, // Asegurar que `role` no sea `null`
      created_at: user.created_at,
      updated_at: user.updated_at,
      deleted_at: user.deleted_at ?? undefined, // Convertir `null` a `undefined`
    });
  }
}
