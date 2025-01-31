
export class Order {
  id!: string;
  user_id!: string | null;
  total_price!: number | null;
  address?: string | null;
  order_type!: OrderType;
  order_state?: OrderState | null;
  created_at!: Date;
  updated_at!: Date;
  deleted_at?: Date | null;

  constructor(partial: Partial<Order>) {
    Object.assign(this, {
      ...partial,
      address: partial.address ?? undefined,
      order_state: partial.order_state ?? undefined, 
    });
  }
}

export enum OrderType {
    PICKUP = 'pickup',
    DELIVERY = 'delivery',
  }
  
  export enum OrderState {
    PENDIENTE = 'PENDIENTE',
    EN_PROCESO = 'EN_PROCESO',
    FINALIZADO = 'FINALIZADO',
    CANCELADO = 'CANCELADO',
  }
