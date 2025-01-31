import { IOrderRepository } from '../../application/interfaces/order.interface';
import { Order } from '../../domain/order.entity';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class OrderRepository implements IOrderRepository {
  async create(orderData: Partial<Order>): Promise<Order> {
    const createdOrder = await prisma.order.create({
      data: {
        user_id: orderData.user_id!,
        total_price: orderData.total_price!,
        address: orderData.address ?? null,
        order_type: orderData.order_type!,
        order_state: orderData.order_state ?? 'PENDIENTE',
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return new Order(createdOrder);
  }

  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { ProductOrder: true }, // Incluye los productos asociados
    });

    return order ? new Order(order) : null;
  }

  async listAll(skip: number, take: number): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { deleted_at: null },
      skip,
      take,
      include: { ProductOrder: true },
    });

    return orders.map((order: Partial<Order>) => new Order(order));
  }

  async update(id: string, updateData: Partial<Order>): Promise<Order> {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        address: updateData.address ?? null,
        order_state: updateData.order_state,
        updated_at: new Date(),
      },
    });

    return new Order(updatedOrder);
  }

  async delete(id: string): Promise<void> {
    await prisma.order.update({
      where: { id },
      data: { deleted_at: new Date() }, // Soft delete
    });
  }

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        order_state: status as 'PENDIENTE' | 'EN_PROCESO' | 'FINALIZADO' | 'CANCELADO',
        updated_at: new Date(),
      },
    });

    return new Order(updatedOrder);
  }

  async cancelOrder(id: string): Promise<Order> {
    const canceledOrder = await prisma.order.update({
      where: { id },
      data: {
        order_state: 'CANCELADO',
        updated_at: new Date(),
      },
    });

    return new Order(canceledOrder);
  }
}
