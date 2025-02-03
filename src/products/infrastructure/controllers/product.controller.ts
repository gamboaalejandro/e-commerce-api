import { Request, Response, NextFunction } from 'express';
import { IProductService } from '../../application/interfaces/product.interface';
import { SuccessResponse } from '../../../auth/application/dto/response_login.dto';
import { WinstonLogger } from '../../../core/infrastructure/logger/winston.logger';
import { ILogger } from '../../../core/infrastructure/logger/logger';

const logger: ILogger = new WinstonLogger();

export class ProductController {
  constructor(private readonly productService: IProductService) {}

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await this.productService.createProduct(req.body);
      const resp = new SuccessResponse(product);
      res.status(201).json(resp);
    } catch (error) {
      console.error(error);
      logger.error(req, `Error en createProduct: ${error}`);
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);
      const resp = new SuccessResponse(product);
      res.status(200).json(resp);
    } catch (error) {
      console.error(error);
      logger.error('Error en getProductById', error);
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updatedProduct = await this.productService.updateProduct(
        id,
        req.body
      );
      const resp = new SuccessResponse(updatedProduct);
      res.status(200).json(resp);
    } catch (error) {
      console.error(error);
      logger.error(req, `Error en updateProduct: ${error}`);
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.productService.deleteProduct(id);
      const resp = new SuccessResponse<string>(
        'Producto eliminado exitosamente'
      );
      res.status(204).send(JSON.parse(JSON.stringify(resp)));
    } catch (error) {
      console.error(error);
      logger.error(req, `Error en deleteProduct: ${error}`);
      next(error);
    }
  }

  async listProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { offset = '0', limit = '10' } = req.query;
      const products = await this.productService.listAll({
        offset: Number(offset),
        limit: Number(limit),
      });
      const resp = new SuccessResponse(products);
      res.status(200).json(resp);
    } catch (error) {
      console.error(error);
      logger.error(req, `Error en deleteProduct: ${error}`);

      next(error);
    }
  }
}
