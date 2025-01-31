import { Order } from '../../domain/order.entity';

export interface IOrderRepository {
  create(orderData: Partial<Order>): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  listAll(skip: number, take: number): Promise<Order[]>;
  update(id: string, updateData: Partial<Order>): Promise<Order>;
  delete(id: string): Promise<void>;
  updateOrderStatus(id: string, status: string): Promise<Order>;
  cancelOrder(id: string): Promise<Order>;
}
