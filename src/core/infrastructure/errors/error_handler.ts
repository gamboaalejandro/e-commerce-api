// src/core/infrastructure/errors/errorHandler.ts
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { BaseError } from './base_error';

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Comprobamos si es uno de nuestros errores
  if (error instanceof BaseError) {
    // Enviamos la info necesaria
    reply.status(error.httpCode).send({
      error: error.name,
      message: error.message,
      statusCode: error.httpCode,
    });
  } else {
    // Error no controlado / no esperado
    reply.status(500).send({
      error: 'InternalServerError',
      message: 'An unexpected error occurred',
      statusCode: 500,
    });
  }
}
