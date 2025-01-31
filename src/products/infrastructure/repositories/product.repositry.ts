import { PrismaClient } from '@prisma/client';
import { Product } from '../../domain/product.entity';
import { IProductRepository } from '../../application/interfaces/product.repository';

const prisma = new PrismaClient();

export default class ProductRepository implements IProductRepository {
  async create(product: Partial<Product>): Promise<Product> {
    const newProduct = await prisma.product.create({
      data: {
        name: product.name!,
        description: product.description!,
        price: product.price!,
        stock: product.stock!,
        is_active: product.is_active ?? true,
      },
    });

    return this.mapToEntity(newProduct);
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product ? this.mapToEntity(product) : null;
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...product,
        updated_at: new Date(),
      },
    });

    return this.mapToEntity(updatedProduct);
  }

  async delete(id: string): Promise<void> {
    await prisma.product.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }

  async listAll(skip: number, take: number): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: { deleted_at: null },
      skip,
      take,
    });
    return products.map(this.mapToEntity);
  }

  private mapToEntity(product: any): Product {
    return new Product({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      is_active: product.is_active ?? true,
      created_at: product.created_at,
      updated_at: product.updated_at,
      deleted_at: product.deleted_at ?? undefined,
    });
  }
}
