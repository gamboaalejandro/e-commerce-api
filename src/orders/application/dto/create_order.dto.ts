import { OrderType, OrderState } from '../../domain/order.entity';
export class CreateOrderDto {
  user_id!: string;
  total_price!: number;
  address?: string;
  order_type!: OrderType;
  order_state!: OrderState;
  products!: { product_id: string; quantity: number }[];

  constructor(partial: Partial<CreateOrderDto>) {
    Object.assign(this, {
      ...partial,
      address: partial.address ?? undefined, // ✅ Convertimos null a undefined
      products: partial.products ?? [],
    });
  }
}
