// server.ts
import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import config from './src/core/config';
import { errorHandler } from './src/core/infrastructure/errors/error_handler';
import { WinstonLogger } from './src/core/infrastructure/logger/winston.logger';
import { ILogger } from './src/core/infrastructure/logger/logger';
import jwtPlugin from './src/core/infrastructure/security/jwt.plugin';
import { registerAuthRoutes } from './src/auth/infrastructure/router';

import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { registerUserRoutes } from './src/user/infrastructure/router';
import { registerProductRoutes } from './src/products/infrastructure/router';
import { registerOrderRoutes } from './src/orders/infrastructure/controller/router';

export async function buildServer(): Promise<FastifyInstance> {
  const app = fastify({ logger: { level: 'debug' } });

  /**
   * 1. REGISTRA MIDDLEWARES/PLUGINS GLOBALES
   *    Ejemplo: JWT plugin, CORS, etc.
   */
  app.register(swagger, {
    openapi: {
      info: {
        title: 'E-Commerce API',
        description: 'Documentación de la API de E-Commerce',
        version: '1.0.0',
      },
      servers: [{ url: 'http://localhost:3000' }],
      tags: [
        {
          name: 'Auth',
          description: 'Endpoints for Authentication',
        },
      ],
    },
  });

  // 🔹 Configuración de Swagger UI (Interfaz Web)
  app.register(swaggerUI, {
    routePrefix: '/docs', // 📌 URL para ver Swagger: http://localhost:3000/docs
  });

  app.register(jwtPlugin);

  /**
   * 2. REGISTRA RUTAS DE CADA MÓDULO
   *    Prefijos recomendados para la organización (ej. '/api/auth')
   */
  app.register(registerAuthRoutes);

  app.register(registerUserRoutes, { prefix: '/api/user' });
  app.register(registerProductRoutes, { prefix: '/api/product' });
  app.register(registerOrderRoutes, { prefix: '/api/order' });

  /**
   * 3. MANEJADOR GLOBAL DE ERRORES
   */
  app.setErrorHandler(errorHandler);
  const logger: ILogger = new WinstonLogger(); //buscar la manera de inyectar
  // Definimos un endpoint mínimo
  app.get('/hola', async (req: FastifyRequest, reply: FastifyReply) => {
    logger.info(req, 'GET /hola');
    logger.error(req, `el secret ${config.secretKey}`);

    return reply.send({ message: 'Hola Mundo' });
  });

  app.addHook('onClose', (instance, done) => {
    logger.info(undefined, 'Server is closing...');
    done();
  });

  return app;
}

/**
 * startServer: Inicia el servidor en el puerto definido en config
 */
export async function startServer(): Promise<void> {
  const app = await buildServer();

  try {
    await app.listen({ port: config.port, host: config.host });
    console.log(`Server running at http://${config.host}:${config.port}`);
  } catch (error) {
    // Puedes usar tu logger Winston en vez de console.error
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}
