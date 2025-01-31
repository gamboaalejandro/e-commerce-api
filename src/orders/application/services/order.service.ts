import { Order } from '../../domain/order.entity';
import { IOrderService } from '../../domain/order.interface';
import { PaginationDto } from '../../../core/application/dto/pagination.dto';
import { IOrderRepository } from '../interfaces/order.interface';
import { OrderState } from '../../domain/order.state';

export class OrderService implements IOrderService {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async createOrder(data: Partial<Order>): Promise<Order> {
    return this.orderRepository.create(data);
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async updateOrder(id: string, data: Partial<Order>): Promise<Order> {
    return this.orderRepository.update(id, data);
  }

  async deleteOrder(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }

  async listOrders(pagination: PaginationDto): Promise<Order[]> {
    return this.orderRepository.listAll(pagination.offset, pagination.limit);
  }

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    // Validamos si el estado proporcionado es válido
    if (!Object.values(OrderState).includes(status as OrderState)) {
      throw new Error(`Invalid order state: ${status}`);
    }

    return await this.orderRepository.updateOrderStatus(
      id,
      status as OrderState
    );
  }

  async cancelOrder(id: string): Promise<Order> {
    return this.orderRepository.update(id, {
      order_state: OrderState.CANCELADO,
    });
  }
}
