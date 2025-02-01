import { Router } from 'express';
import { ProductController } from './controllers/product.controller';
import ProductRepository from './repositories/product.repositry';
import { ProductService } from '../application/product.service';
import { validateRequest } from '../../core/application/validate_request';
import {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
  getAllProductsValidator,
} from '../application/validations/validations.schemas';
import { authenticateJWT } from '../../core/infrastructure/middleware/jwt.middleware';
import { authorizeRole } from '../../core/infrastructure/middleware/authorization.middleware';

const productRouter = Router();

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

productRouter.post(
  '/',
  authenticateJWT,
  authorizeRole([1]),
  createProductValidator,
  validateRequest,
  productController.createProduct.bind(productController)
);

productRouter.get(
  '/:id',
  authenticateJWT,
  authorizeRole([1]),
  getProductValidator,
  validateRequest,
  productController.getProductById.bind(productController)
);

productRouter.put(
  '/:id',
  authenticateJWT,
  authorizeRole([1]),
  updateProductValidator,
  validateRequest,
  productController.updateProduct.bind(productController)
);

productRouter.delete(
  '/:id',
  authenticateJWT,
  authorizeRole([1]),
  deleteProductValidator,
  validateRequest,
  productController.deleteProduct.bind(productController)
);

productRouter.get(
  '/',
  authenticateJWT,
  authorizeRole([1]),
  getAllProductsValidator,
  validateRequest,
  productController.listProducts.bind(productController)
);

export default productRouter;
