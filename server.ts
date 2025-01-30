// server.ts
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import config from './src/core/config';                           // Variables de entorno (puerto, JWT secret, etc.)
import { errorHandler } from './src/core/infrastructure/errors/error_handler';
import { WinstonLogger } from './src/core/infrastructure/logger/winston.logger';
import { ILogger } from './src/core/infrastructure/logger/logger';

// Rutas (capa de infraestructura de cada módulo)

// (Opcional) si quieres desactivar el logger interno de Fastify, pon logger: false 
// y usa exclusivamente tu logger Winston
export async function buildServer(): Promise<FastifyInstance> {
  const app = fastify({ logger: false });

  /**
   * 1. REGISTRA MIDDLEWARES/PLUGINS GLOBALES
   *    Ejemplo: JWT plugin, CORS, etc.
   * 
   *    Si tienes un plugin JWT:
   *    import jwtPlugin from './core/infrastructure/security/jwtPlugin';
   *    app.register(jwtPlugin, { secret: config.jwtSecret });
   */

  /**
   * 2. REGISTRA RUTAS DE CADA MÓDULO
   *    Prefijos recomendados para la organización (ej. '/api/auth')
   */

  /**
   * 3. MANEJADOR GLOBAL DE ERRORES
   */
  app.setErrorHandler(errorHandler);
  const logger:ILogger = new WinstonLogger() //buscar la manera de inyectar 
    // Definimos un endpoint mínimo
  app.get("/hola", async (req: FastifyRequest, reply: FastifyReply) => {
        logger.info(req, "GET /hola");
        logger.error(req, "hay un error acac")
        return reply.send({ message: "Hola Mundo" });
  });
  

  // (Opcional) Hooks para cierre limpio de la aplicación
  // app.addHook('onClose', (instance, done) => {
  //   // logger.info(undefined, 'Server is closing...');
  //   done();
  // });

  return app;
}

/**
 * startServer: Inicia el servidor en el puerto definido en config
 */
export async function startServer(): Promise<void> {
  const app = await buildServer();

  try {
    await app.listen({ port: config.port, host: '0.0.0.0' });
    console.log(`Server running at http://localhost:${config.port}`);
  } catch (error) {
    // Puedes usar tu logger Winston en vez de console.error
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

/**
 * Si este archivo se ejecuta directamente con "node server.js" o "ts-node server.ts",
 * arrancamos el servidor. Si lo importas en un test, no arrancará automáticamente.
 */
if (require.main === module) {
  startServer();
}
