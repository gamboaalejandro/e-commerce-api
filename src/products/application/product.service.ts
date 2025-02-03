import { NotFoundError } from '../../core/infrastructure/errors/custom_errors/not_found.error';
import { Product } from '../domain/product.entity';
import { IProductService } from './interfaces/product.interface';
import { IProductRepository } from './interfaces/product.repository';
import { PaginationDto } from '../../core/application/dto/pagination.dto';

export class ProductService implements IProductService {
  constructor(private readonly productRepository: IProductRepository) {}
  listAll(pagination: PaginationDto): Promise<Product[]> {
    return this.productRepository.listAll(pagination);
  }
  async createProduct(data: Partial<Product>): Promise<Product> {
    const existingProduct = await this.productRepository.findByName(
      data.name ?? ''
    );
    if (existingProduct) {
      throw new Error('Product with this name already exists');
    }

    return await this.productRepository.create(data);
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    return product;
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundError('Product not found');
    }

    return await this.productRepository.update(id, data);
  }

  async deleteProduct(id: string): Promise<void> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundError('Product not found');
    }

    await this.productRepository.delete(id);
  }

  async getTotalPriceForOrder(
    products: { product_id: string; quantity: number }[]
  ): Promise<number> {
    const total_price =
      await this.productRepository.getTotalPriceForOrder(products);

    return total_price;
  }
}
