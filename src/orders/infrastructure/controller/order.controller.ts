import { Request, Response, NextFunction } from 'express';
import { IOrderService } from '../../domain/order.interface';
import { SuccessResponse } from '../../../auth/application/dto/response_login.dto';
import { Order } from '../../domain/order.entity';

export class OrderController {
  constructor(private readonly orderService: IOrderService) {}

  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const orderData = req.body;
      const order = await this.orderService.createOrder(orderData);
      const resp = new SuccessResponse<Order>(order);
      res.status(201).json(resp);
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const order = await this.orderService.getOrderById(id);
      const resp = new SuccessResponse<Order>(order);
      res.status(200).json(resp);
    } catch (error) {
      next(error);
    }
  }

  async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const orderData = req.body;
      const updatedOrder = await this.orderService.updateOrder(id, orderData);
      const resp = new SuccessResponse<Order>(updatedOrder);

      res.status(200).json(resp);
    } catch (error) {
      next(error);
    }
  }

  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.orderService.deleteOrder(id);
      const resp = new SuccessResponse('Orden eliminada con éxito');

      res.status(204).send(resp);
    } catch (error) {
      next(error);
    }
  }

  async listOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { offset = '0', limit = '10' } = req.query as {
        offset?: string;
        limit?: string;
      };
      const orders = await this.orderService.listOrders({
        offset: Number(offset),
        limit: Number(limit),
      });
      const resp = new SuccessResponse<Order[]>(orders);

      res.status(200).json(resp);
    } catch (error) {
      next(error);
    }
  }
  async cancelOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const canceledOrder = await this.orderService.cancelOrder(id);
      const resp = new SuccessResponse<Order>(canceledOrder);

      res.status(200).json(resp);
    } catch (error) {
      next(error);
    }
  }
}
