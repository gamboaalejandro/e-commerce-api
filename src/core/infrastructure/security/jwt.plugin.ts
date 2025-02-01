import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import jwt from '@fastify/jwt';
import config from '../../config';
import { UnauthorizedError } from '../errors/custom_errors/unauthorized.error';
import { WinstonLogger } from '../logger/winston.logger';
const logger = new WinstonLogger();
export default async function jwtPlugin(fastify: FastifyInstance) {
  console.log('REGISTRANDO ');
  fastify.register(jwt, {
    secret: config.jwtSecret, // algo como "superSecretKey"
  });

  // Decorador para proteger rutas
  fastify.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        const token = request.headers.authorization;
        console.log(token);
        await request.jwtVerify(); // Verifica el token JWT
      } catch (err) {
        console.log(err);
        logger.error(request, 'Unauthorized access');
        reply.code(401).send(new UnauthorizedError()); // Si no se valida, responde con 401 Unauthorized
      }
    }
  );
}
