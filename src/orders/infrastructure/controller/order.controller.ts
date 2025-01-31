import { FastifyReply, FastifyRequest } from 'fastify';
import { IOrderService } from '../../domain/order.interface';

export class OrderController {
  constructor(private readonly orderService: IOrderService) {}

  async createOrder(request: FastifyRequest, reply: FastifyReply) {
    const orderData = request.body as any;
    const order = await this.orderService.createOrder(orderData);
    return reply.status(201).send(order);
  }

  async getOrderById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as any;
    const order = await this.orderService.getOrderById(id);
    return order
      ? reply.status(200).send(order)
      : reply.status(404).send({ message: 'Order not found' });
  }

  async updateOrder(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as any;
    const orderData = request.body as any;
    const updatedOrder = await this.orderService.updateOrder(id, orderData);
    return reply.status(200).send(updatedOrder);
  }

  async deleteOrder(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as any;
    await this.orderService.deleteOrder(id);
    return reply.status(204).send();
  }

  async listOrders(request: FastifyRequest, reply: FastifyReply) {
    const { offset, limit } = request.query as any;
    const orders = await this.orderService.listOrders({ offset, limit });
    return reply.status(200).send(orders);
  }

  async updateOrderStatus(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as any;
    const { order_state } = request.body as any;
    const updatedOrder = await this.orderService.updateOrderStatus(
      id,
      order_state
    );
    return reply.status(200).send(updatedOrder);
  }

  async cancelOrder(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as any;
    const canceledOrder = await this.orderService.cancelOrder(id);
    return reply.status(200).send(canceledOrder);
  }
}
