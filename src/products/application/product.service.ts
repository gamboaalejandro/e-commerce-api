import { Product } from '../domain/product.entity';
import { IProductService } from './interfaces/product.interface';
import { IProductRepository } from './interfaces/product.repository';

export class ProductService implements IProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async createProduct(data: Partial<Product>): Promise<Product> {
    const existingProduct = await this.productRepository.listAll(0, 1); // Verificar si existe uno similar
    if (existingProduct.some((p) => p.name === data.name)) {
      throw new Error('Product with this name already exists');
    }

    return await this.productRepository.create(data);
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    return await this.productRepository.update(id, data);
  }

  async deleteProduct(id: string): Promise<void> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    await this.productRepository.delete(id);
  }

  async listProducts(offset: number, limit: number): Promise<Product[]> {
    return await this.productRepository.listAll(offset, limit);
  }
}
