import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      name: 'ValidationError',
      statusCode: 400,
      message: 'Error en la validación de los datos enviados',
      validationErrors: errors.array(),
    });
    return;
  }
  next();
};
