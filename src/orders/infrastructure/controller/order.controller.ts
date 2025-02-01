import { Request, Response, NextFunction } from 'express';
import { IOrderService } from '../../domain/order.interface';

export class OrderController {
  constructor(private readonly orderService: IOrderService) {}

  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const orderData = req.body;
      const order = await this.orderService.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const order = await this.orderService.getOrderById(id);
      if (!order) {
        res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const orderData = req.body;
      const updatedOrder = await this.orderService.updateOrder(id, orderData);
      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }

  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.orderService.deleteOrder(id);
      res.status(204).send();
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
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { order_state } = req.body;
      const updatedOrder = await this.orderService.updateOrderStatus(
        id,
        order_state
      );
      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }

  async cancelOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const canceledOrder = await this.orderService.cancelOrder(id);
      res.status(200).json(canceledOrder);
    } catch (error) {
      next(error);
    }
  }
}
