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

export async function buildServer(): Promise<FastifyInstance> {
  const app = fastify({ logger: false });

  /**
   * 1. REGISTRA MIDDLEWARES/PLUGINS GLOBALES
   *    Ejemplo: JWT plugin, CORS, etc.
   *
   */

  /**
   * 2. REGISTRA RUTAS DE CADA MÓDULO
   *    Prefijos recomendados para la organización (ej. '/api/auth')
   */

  /**
   * 3. MANEJADOR GLOBAL DE ERRORES
   */
  app.setErrorHandler(errorHandler);
  const logger: ILogger = new WinstonLogger(); //buscar la manera de inyectar
  // Definimos un endpoint mínimo
  app.get('/hola', async (req: FastifyRequest, reply: FastifyReply) => {
    logger.info(req, 'GET /hola');
    logger.error(req, `el secrete ${config.secretKey}`);

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
