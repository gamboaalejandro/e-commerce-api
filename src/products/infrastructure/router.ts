import { FastifyInstance } from 'fastify';
import ProductRepository from './repositories/product.repositry';
import { ProductService } from '../application/product.service';
import { ProductController } from './controllers/product.controller';
import {
  createProductSchema,
  deleteProductSchema,
  getAllProductsSchema,
  getProductSchema,
  updateProductSchema,
} from '../application/validations/validations.schemas';

export async function registerProductRoutes(fastify: FastifyInstance) {
  const productRepositoryInstance = new ProductRepository();
  const productServiceInstance = new ProductService(productRepositoryInstance);
  const productControllerInstance = new ProductController(
    productServiceInstance
  );

  fastify.get(
    '/products',
    {
      schema: getAllProductsSchema,
    },
    productControllerInstance.listProducts.bind(productControllerInstance)
  );

  fastify.post(
    '/',
    { schema: createProductSchema },
    productControllerInstance.createProduct.bind(productControllerInstance)
  );

  fastify.get(
    '/:id',
    { schema: getProductSchema },
    productControllerInstance.getProductById.bind(productControllerInstance)
  );

  fastify.put(
    '/:id',
    { schema: updateProductSchema },
    productControllerInstance.updateProduct.bind(productControllerInstance)
  );

  fastify.delete(
    '/:id',
    { schema: deleteProductSchema },
    productControllerInstance.deleteProduct.bind(productControllerInstance)
  );
}
