export class Product {
  id!: string;
  name!: string;
  description!: string;
  price!: number;
  stock!: number;
  is_active!: boolean;
  created_at!: Date;
  updated_at!: Date;
  deleted_at?: Date | null;

  constructor(partial: Partial<Product>) {
    Object.assign(this, {
      ...partial,
      is_active: partial.is_active ?? true,
    });
  }
}
