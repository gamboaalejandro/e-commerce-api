import { Product } from '../../domain/product.entity';

export interface IProductRepository {
  create(product: Partial<Product>): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  update(id: string, product: Partial<Product>): Promise<Product>;
  delete(id: string): Promise<void>;
  listAll(skip: number, take: number): Promise<Product[]>;
}
