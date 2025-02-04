import { Order } from '../../domain/order.entity';
import { IOrderService } from '../../domain/order.interface';
import { PaginationDto } from '../../../core/application/dto/pagination.dto';
import { IOrderRepository } from '../interfaces/order.interface';
import { OrderState } from '../../domain/order.state';
import { CreateOrderDto } from '../dto/create_order.dto';
import { IProductService } from '../../../products/application/interfaces/product.interface';
import { IUserService } from '../../../user/domain/user.interface';
import { NotFoundError } from '../../../core/infrastructure/errors/custom_errors/not_found.error';
import { ConflictError } from '../../../core/infrastructure/errors/custom_errors/conflict.error';

export class OrderService implements IOrderService {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly productService: IProductService,
    private readonly userService: IUserService
  ) {}

  async createOrder(data: CreateOrderDto): Promise<Order> {
    const total_price = await this.productService.getTotalPriceForOrder(
      data.products
    );
    //luego de procesar el precio, restamos al stock de los productos
    const user = await this.userService.getCurrentUser(data.user_id);
    if (!user) throw new NotFoundError('Usuario no encontrado');
    data.total_price = total_price;
    return this.orderRepository.create(data);
  }

  async getOrderById(id: string): Promise<Order | null> {

    const order = this.orderRepository.findById(id);
    if (!order) throw new NotFoundError('Orden no encontrada');
    return order;
  }

  async updateOrder(id: string, data: Partial<Order>): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new NotFoundError('Orden no encontrada ');

    //validamos si la orden ya fue cancelada
    if (order.order_state === OrderState.CANCELADO)
      throw new ConflictError('La orden ya ha sido cancelada');

    //validamos si el estado proporcionado es válido
    if (!Object.values(OrderState).includes(data.order_state as OrderState)) {
      throw new ConflictError(
        `Estado de la orden invalido : ${data.order_state}`
      );
    }

    return this.orderRepository.update(id, data);
  }

  async deleteOrder(id: string): Promise<void> {
    const order = this.orderRepository.findById(id);
    if (!order) throw new NotFoundError('Orden no encontrada');
    await this.orderRepository.delete(id);
  }

  async listOrders(pagination: PaginationDto): Promise<Order[]> {
    return this.orderRepository.listAll(pagination.offset, pagination.limit);
  }

  async cancelOrder(id: string): Promise<Order> {
    const order = this.orderRepository.findById(id);
    if (!order) throw new NotFoundError('Orden no encontrada');
    return this.orderRepository.update(id, {
      order_state: OrderState.CANCELADO,
    });
  }
}
