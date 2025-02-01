import express, { Express } from 'express';
import config from './src/core/config';
import { errorHandler } from './src/core/infrastructure/errors/error_handler';
import { WinstonLogger } from './src/core/infrastructure/logger/winston.logger';
import authRouter from './src/auth/infrastructure/router';
import userRouter from './src/user/infrastructure/router';
import productRouter from './src/products/infrastructure/router';
import orderRouter from './src/orders/infrastructure/router';
import swaggerUi from 'swagger-ui-express';

import swaggerConfig from './src/core/config/swagger.config';

// import { registerUserRoutes } from './src/user/infrastructure/router';
// import { registerProductRoutes } from './src/products/infrastructure/router';
// import { registerOrderRoutes } from './src/orders/infrastructure/controller/router';

const logger = new WinstonLogger();

export function buildServer(): Express {
  const app = express();

  // Middleware para parsear JSON
  app.use(express.json());

  /**
   * 1. AUTENTICACIÓN JWT (Middleware)
   */

  /**
   * 2. SWAGGER (Documentación API)
   */
  // app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  /**
   * 3. RUTAS
   */
  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/product', productRouter);
  app.use('/api/order', orderRouter);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

  /**
   * 4. MANEJADOR GLOBAL DE ERRORES
   */
  app.use(errorHandler);

  return app;
}

/**
 * Inicia el servidor en el puerto definido en config
 */
export function startServer(): void {
  const app = buildServer();

  app.listen(config.port, config.host, () => {
    logger.info(undefined, 'Iniciando servidor ');
    console.log(`🚀 Server running at http://${config.host}:${config.port}`);
  });
}

if (require.main === module) {
  startServer();
}
