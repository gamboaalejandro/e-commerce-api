import { FastifyInstance } from 'fastify';
import { OrderService } from '../../application/services/order.service';

import {
  createOrderSchema,
  getOrderByIdSchema,
  updateOrderSchema,
  deleteOrderSchema,
  getAllOrdersSchema,
  updateOrderStatusSchema,
  cancelOrderSchema,
} from '../../application/validations/validations.schema';
import { OrderController } from './order.controller';
import { OrderRepository } from '../repositories/order.repository';

export async function registerOrderRoutes(fastify: FastifyInstance) {
  const orderRepositoryInstance = new OrderRepository();
  const orderServiceInstance = new OrderService(orderRepositoryInstance);
  const orderControllerInstance = new OrderController(orderServiceInstance);

  fastify.post(
    '/orders',
    { schema: createOrderSchema },
    orderControllerInstance.createOrder.bind(orderControllerInstance)
  );

  fastify.get(
    '/orders/:id',
    { schema: getOrderByIdSchema },
    orderControllerInstance.getOrderById.bind(orderControllerInstance)
  );

  fastify.put(
    '/orders/:id',
    { schema: updateOrderSchema },
    orderControllerInstance.updateOrder.bind(orderControllerInstance)
  );

  fastify.delete(
    '/orders/:id',
    { schema: deleteOrderSchema },
    orderControllerInstance.deleteOrder.bind(orderControllerInstance)
  );

  fastify.get(
    '/orders',
    { schema: getAllOrdersSchema },
    orderControllerInstance.listOrders.bind(orderControllerInstance)
  );

  fastify.patch(
    '/orders/:id/status',
    { schema: updateOrderStatusSchema },
    orderControllerInstance.updateOrderStatus.bind(orderControllerInstance)
  );

  fastify.patch(
    '/orders/:id/cancel',
    { schema: cancelOrderSchema },
    orderControllerInstance.cancelOrder.bind(orderControllerInstance)
  );
}
