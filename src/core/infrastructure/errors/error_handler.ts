import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { BaseError } from './base_error';
import { ILogger } from '../logger/logger';
import { WinstonLogger } from '../logger/winston.logger';
const logger: ILogger = new WinstonLogger(); //buscar la manera de inyectar

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof BaseError) {
    return reply.status(error.httpCode).send({
      error: error.name,
      message: error.message,
      statusCode: error.httpCode,
    });
  }

  //Capturar errores de validación de Fastify
  if (error.validation) {
    logger.error(request, `Error de validación detectado: ${error.validation}`);

    // 🔹 Formatear los errores de validación en un array de mensajes legibles
    const validationErrors = error.validation.map((err) => ({
      field: err.instancePath.replace('/', ''), // 🔹 Extrae el nombre del campo
      message: err.message,
    }));

    return reply.status(400).send({
      name: 'ValidationError',
      statusCode: 400,
      message: 'Error en la validación de los datos enviados',
      validationErrors,
    });
  }
  logger.error(request, `Error no controlado: ${error}`);

  return reply.status(500).send({
    error: 'InternalServerError',
    message: 'An unexpected error occurred',
    statusCode: 500,
  });
}
