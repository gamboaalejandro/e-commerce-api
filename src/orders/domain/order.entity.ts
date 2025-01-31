export class Order {
  id!: string;
  user_id!: string;
  total_price!: number;
  address?: string;
  order_type!: 'pickup' | 'delivery';
  order_state!: 'PENDIENTE' | 'EN_PROCESO' | 'FINALIZADO' | 'CANCELADO';
  created_at!: Date;
  updated_at!: Date;
  deleted_at?: Date | null;

  constructor(partial: Partial<Order>) {
    Object.assign(this, {
      ...partial,
      order_state: partial.order_state ?? 'PENDIENTE', // Estado predeterminado
      created_at: partial.created_at ?? new Date(),
      updated_at: partial.updated_at ?? new Date(),
    });
  }
}
