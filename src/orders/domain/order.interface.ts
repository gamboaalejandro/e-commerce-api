import { PaginationDto } from '../../core/application/dto/pagination.dto';
import { Order } from './order.entity';

export interface IOrderService {
  createOrder(data: Partial<Order>): Promise<Order>;

  getOrderById(id: string): Promise<Order | null>;

  updateOrder(id: string, data: Partial<Order>): Promise<Order>;

  deleteOrder(id: string): Promise<void>;

  listOrders(pagination: PaginationDto): Promise<Order[]>;

  updateOrderStatus(id: string, order_state: string): Promise<Order>;

  cancelOrder(id: string): Promise<Order>;
}
