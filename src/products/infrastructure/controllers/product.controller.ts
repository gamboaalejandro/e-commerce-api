import { FastifyReply, FastifyRequest } from 'fastify';
import { IProductService } from '../../application/interfaces/product.interface';

export class ProductController {
  constructor(private readonly productService: IProductService) {}

  async createProduct(req: FastifyRequest, reply: FastifyReply) {
    try {
      const product = await this.productService.createProduct(req.body as any);
      reply.status(201).send(product);
    } catch (error) {
      console.log(error);

      reply.status(400).send({ error: 'BadRequestError', message: '' });
    }
  }

  async getProductById(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: string };
      const product = await this.productService.getProductById(id);
      reply.status(200).send(product);
    } catch (error) {
      console.log(error);

      reply.status(404).send({ error: 'NotFoundError', message: '' });
    }
  }

  async updateProduct(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: string };
      const updatedProduct = await this.productService.updateProduct(
        id,
        req.body as any
      );
      reply.status(200).send(updatedProduct);
    } catch (error) {
      console.log(error);

      reply
        .status(404)
        .send({ error: 'NotFoundError', message: 'error.message' });
    }
  }

  async deleteProduct(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: string };
      await this.productService.deleteProduct(id);
      reply.status(204).send();
    } catch (error) {
      console.log(error);
      reply
        .status(404)
        .send({ error: 'NotFoundError', message: 'error.message' });
    }
  }

  async listProducts(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { skip, take } = req.query as { skip?: string; take?: string };
      const products = await this.productService.listProducts(
        Number(skip) || 0,
        Number(take) || 10
      );
      reply.status(200).send(products);
    } catch (error) {
      console.log(error);

      reply
        .status(400)
        .send({ error: 'BadRequestError', message: 'error.message' });
    }
  }
}
