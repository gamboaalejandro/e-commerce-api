import express from 'express';
import { validateRequest } from '../../core/application/validate_request';
import {
  createOrderValidator,
  getOrderByIdValidator,
  updateOrderValidator,
  deleteOrderValidator,
  getAllOrdersValidator,
  updateOrderStatusValidator,
  cancelOrderValidator,
} from '../application/validations/validations.schema';
import { OrderController } from './controller/order.controller';
import { OrderService } from '../application/services/order.service';
import { OrderRepository } from './repositories/order.repository';
import { authorizeRole } from '../../core/infrastructure/middleware/authorization.middleware';
import { authenticateJWT } from '../../core/infrastructure/middleware/jwt.middleware';

const orderRouter = express.Router();
const orderRepositoryInstance = new OrderRepository();
const orderServiceInstance = new OrderService(orderRepositoryInstance);
const orderControllerInstance = new OrderController(orderServiceInstance);
// Crear orden
orderRouter.post(
  '/',
  authenticateJWT,
  authorizeRole([1, 2]),
  createOrderValidator,
  validateRequest,
  orderControllerInstance.createOrder.bind(orderControllerInstance)
);

// Obtener orden por ID
orderRouter.get(
  '/:id',

  authenticateJWT,
  authorizeRole([1]),
  getOrderByIdValidator,
  validateRequest,
  orderControllerInstance.getOrderById.bind(orderControllerInstance)
);

// Actualizar orden
orderRouter.put(
  '/:id',
  authenticateJWT,
  authorizeRole([1]),
  updateOrderValidator,
  validateRequest,
  orderControllerInstance.updateOrder.bind(orderControllerInstance)
);

// Eliminar orden
orderRouter.delete(
  '/:id',
  authenticateJWT,
  authorizeRole([1]),
  deleteOrderValidator,
  validateRequest,
  orderControllerInstance.deleteOrder.bind(orderControllerInstance)
);

// Obtener todas las órdenes con paginación
orderRouter.get(
  '/',
  authenticateJWT,
  authorizeRole([1]),
  getAllOrdersValidator,
  validateRequest,
  orderControllerInstance.listOrders.bind(orderControllerInstance)
);

// Actualizar estado de la orden
orderRouter.patch(
  '/:id/status',
  authenticateJWT,
  authorizeRole([1]),
  updateOrderStatusValidator,
  validateRequest,
  orderControllerInstance.updateOrderStatus.bind(orderControllerInstance)
);

// Cancelar orden
orderRouter.patch(
  '/:id/cancel',
  cancelOrderValidator,
  validateRequest,
  orderControllerInstance.cancelOrder.bind(orderControllerInstance)
);

export default orderRouter;
