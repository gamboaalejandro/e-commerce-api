import { OrderState } from '../../domain/order.state';

export class UpdateOrderDto {
  address?: string;
  order_state?: OrderState;

  constructor(partial: Partial<UpdateOrderDto>) {
    Object.assign(this, {
      ...partial,
      address: partial.address ?? undefined,
      order_state: partial.order_state ?? undefined,
    });
  }
}
