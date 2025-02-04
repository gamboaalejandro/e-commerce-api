import { PaginationDto } from '../../core/application/dto/pagination.dto';
import { CreateOrderDto } from '../application/dto/create_order.dto';
import { Order } from './order.entity';

export interface IOrderService {
  createOrder(data: CreateOrderDto): Promise<Order>;

  getOrderById(id: string): Promise<Order>;

  updateOrder(id: string, data: CreateOrderDto): Promise<Order>;

  deleteOrder(id: string): Promise<void>;

  listOrders(pagination: PaginationDto): Promise<Order[]>;

  cancelOrder(id: string): Promise<Order>;
}
