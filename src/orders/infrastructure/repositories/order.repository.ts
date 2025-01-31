import { PrismaClient, Order as PrismaOrder, OrderType as PrismaOrderType, OrderState as PrismaOrderState } from '@prisma/client';
import { Order, OrderType } from '../../domain/order.entity';
import { IOrderRepository } from '../../application/interfaces/order.interface';
import { OrderState } from '../../domain/order.state';
import { UpdateOrderDto } from '../../application/dto/update_order.dto';

const prisma = new PrismaClient();

export class OrderRepository implements IOrderRepository {
  async create(orderData: Partial<Order>): Promise<Order> {
    const newOrder = await prisma.order.create({
      data: {
        user_id: orderData.user_id!,
        total_price: orderData.total_price!,
        address: orderData.address ?? null, 
        order_type: this.mapToPrismaOrderType(orderData.order_type ?? OrderType.PICKUP), // 🔹 Aseguramos que si no es por delivery se asume pickup
        order_state: this.mapToPrismaOrderState(orderData.order_state ?? OrderState.PENDIENTE), // todas las órdenes empiezan en estado pendiente
      },
    });

    return this.mapToEntity(newOrder);
  }

  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({ where: { id } });
    return order ? this.mapToEntity(order) : null;
  }

  async listAll(skip: number, take: number): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      skip,
      take,
      where: { deleted_at: null }, // ✅ Evitamos traer órdenes eliminadas
    });
    return orders.map(this.mapToEntity);
  }

  async update(id: string, updateData: UpdateOrderDto): Promise<Order> {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        ...updateData,
        address: updateData.address ?? null,
        order_state: updateData.order_state ? this.mapToPrismaOrderState(updateData.order_state) : undefined,
      },
    });

    return this.mapToEntity(updatedOrder);
  }

  async delete(id: string): Promise<void> {
    await prisma.order.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }

  async updateOrderStatus(id: string, status: OrderState): Promise<Order> {
    console.log(status);
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { order_state: 'PENDIENTE' },
    });
    return this.mapToEntity(updatedOrder);
  }

  async cancelOrder(id: string): Promise<Order> {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { order_state: OrderState.CANCELADO },
    });
    return this.mapToEntity(updatedOrder);
  }

  private mapToEntity(prismaOrder: PrismaOrder): Order {
    return new Order({
      ...prismaOrder,
      order_type: this.mapToDomainOrderType(prismaOrder.order_type),
      order_state: this.mapToDomainOrderState(prismaOrder.order_state),
    });
  }
  // 🔹 Métodos de conversión entre enums
  private mapToPrismaOrderType(orderType: OrderType): PrismaOrderType {
    return orderType === OrderType.PICKUP ? PrismaOrderType.pickup : PrismaOrderType.delivery;
  }

  private mapToDomainOrderType(prismaOrderType: PrismaOrderType): OrderType {
    return prismaOrderType === PrismaOrderType.pickup ? OrderType.PICKUP : OrderType.DELIVERY;
  }

  private mapToPrismaOrderState(orderState: OrderState): PrismaOrderState {
    return orderState as PrismaOrderState;
  }

  private mapToDomainOrderState(prismaOrderState: PrismaOrderState | null): OrderState | null {
    return prismaOrderState as OrderState | null;
  }
  
}
