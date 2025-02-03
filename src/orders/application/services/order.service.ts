import { Order } from '../../domain/order.entity';
import { IOrderService } from '../../domain/order.interface';
import { PaginationDto } from '../../../core/application/dto/pagination.dto';
import { IOrderRepository } from '../interfaces/order.interface';
import { OrderState } from '../../domain/order.state';
import { ProductService } from '../../../products/application/product.service';
import { CreateOrderDto } from '../dto/create_order.dto';
import { IProductService } from '../../../products/application/interfaces/product.interface';
import { IUserService } from '../../../user/domain/user.interface';
import { NotFoundError } from '../../../core/infrastructure/errors/custom_errors/not_found.error';

export class OrderService implements IOrderService {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly productService: IProductService,
    private readonly userService: IUserService
  ) {}

  async createOrder(data: CreateOrderDto): Promise<Order> {
    console.log(data);
    const total_price = await this.productService.getTotalPriceForOrder(
      data.products
    );
    const user = await this.userService.getCurrentUser(data.user_id);
    if (!user) throw new NotFoundError('User not found');
    data.total_price = total_price;
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

  async;
}
