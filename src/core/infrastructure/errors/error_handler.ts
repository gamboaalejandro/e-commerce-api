import { NextFunction, Request, Response } from 'express';
import { BaseError } from './base_error';
import { ILogger } from '../logger/logger';
import { WinstonLogger } from '../logger/winston.logger';

const logger: ILogger = new WinstonLogger(); // 🔹 Buscar manera de inyectar

export function errorHandler(
  error: any, // Express maneja los errores como `any`
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('LLEGANDO AL ERROR ', error);
  if (error instanceof BaseError) {
    logger.error(req, error.message);
    res.status(error.httpCode).json({
      error: error.name,
      message: error.message,
      statusCode: error.httpCode,
    });
    return;
  }

  // 🔹 Capturar errores de validación de Express (ej: Joi, express-validator)
  if (error.name === 'ValidationError') {
    logger.error(
      req,
      `Error de validación detectado: ${JSON.stringify(error.errors)}`
    );

    res.status(400).json({
      name: 'ValidationError',
      statusCode: 400,
      message: 'Error en la validación de los datos enviados',
      validationErrors: error.errors || [],
    });
    return;
  }

  logger.error(req, `Error no controlado: ${error}`);

  res.status(500).json({
    error: 'InternalServerError',
    message: 'An unexpected error occurred',
    statusCode: 500,
  });
  next(error);
  return;
}
