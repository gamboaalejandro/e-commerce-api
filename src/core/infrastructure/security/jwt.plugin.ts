import fastify_plugin from 'fastify-plugin';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import jwt from '@fastify/jwt';
import config from '../../config';
import { UnauthorizedError } from '../errors/custom_errors/unauthorized.error';
import { WinstonLogger } from '../logger/winston.logger';
const logger = new WinstonLogger();

export default fastify_plugin(async function jwtPlugin(
  fastify: FastifyInstance
) {
  fastify.register(jwt, {
    secret: config.jwtSecret, // algo como "superSecretKey"
  });

  // Decorador para proteger rutas
  fastify.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch (err) {
        logger.error(request, 'Unauthorized access');
        logger.error(request, `ERROR: ${err}`);
        reply.code(401).send(new UnauthorizedError());
      }
    }
  );
});
