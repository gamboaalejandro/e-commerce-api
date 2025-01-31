import { Product } from '../../domain/product.entity';

export interface IProductService {
  createProduct(data: Partial<Product>): Promise<Product>;
  getProductById(id: string): Promise<Product>;
  updateProduct(id: string, data: Partial<Product>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  listProducts(skip: number, take: number): Promise<Product[]>;
}
