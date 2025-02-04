import { PrismaClient } from '@prisma/client';
import { Product } from '../../domain/product.entity';
import { IProductRepository } from '../../application/interfaces/product.repository';
import { PaginationDto } from '../../../core/application/dto/pagination.dto';
import { NotFoundError } from '../../../core/infrastructure/errors/custom_errors/not_found.error';
import { ValidationError } from '../../../core/infrastructure/errors/custom_errors/validation.error';

const prisma = new PrismaClient();

export default class ProductRepository implements IProductRepository {
  findByName(name: string): Promise<Product | null> {
    const product = prisma.product.findFirst({
      where: {
        name: name,
        deleted_at: null, // Solo usuarios activos
      },
    });
    return product;
  }
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
    const product = await prisma.product.findFirst({
      where: {
        id: id,
        deleted_at: null, // Solo usuarios activos
      },
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

  async listAll(pagination: PaginationDto): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: { deleted_at: null, is_active: true },
      skip: pagination.offset,
      take: pagination.limit,
    });
    return products.map(this.mapToEntity);
  }

  async getTotalPriceForOrder(
    products: { product_id: string; quantity: number }[]
  ): Promise<number> {
    // Obtener los productos con los precios
    const productIds = products.map((p) => p.product_id);

    const productPrices = await prisma.product.findMany({
      where: { id: { in: productIds }, deleted_at: null },
      select: { id: true, price: true, stock: true },
    });

    // Validar que todos los productos existen
    if (productPrices.length !== productIds.length) {
      throw new NotFoundError('Some products were not found');
    }

    // Validar que la cantidad solicitada no exceda el stock disponible
    for (const p of products) {
      const product = productPrices.find((prod) => prod.id === p.product_id);
      if (!product) {
        throw new NotFoundError(`Product with ID ${p.product_id} not found`);
      }
      if (p.quantity > product.stock) {
        throw new ValidationError(
          `Product with ID ${p.product_id} has insufficient stock (Available: ${product.stock}, Requested: ${p.quantity})`
        );
      }
    }

    // Multiplicar cada precio por su cantidad
    const totalPrice = products.reduce((sum, p) => {
      const product = productPrices.find((prod) => prod.id === p.product_id);
      return sum + (product ? product.price * p.quantity : 0);
    }, 0);

    // Disminuir el stock SOLO si todo es válido
    await this.decreaseStock(products);

    return totalPrice;
  }

  private async decreaseStock(
    products: { product_id: string; quantity: number }[]
  ) {
    await prisma.$transaction(
      products.map((p) =>
        prisma.product.update({
          where: { id: p.product_id },
          data: { stock: { decrement: p.quantity } },
        })
      )
    );
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
