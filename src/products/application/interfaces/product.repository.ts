import { PaginationDto } from '../../../core/application/dto/pagination.dto';
import { Product } from '../../domain/product.entity';

export interface IProductRepository {
  create(product: Partial<Product>): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  update(id: string, product: Partial<Product>): Promise<Product>;
  delete(id: string): Promise<void>;
  listAll(pagination: PaginationDto): Promise<Product[]>;
  findByName(name: string): Promise<Product | null>;
}
