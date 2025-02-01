import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { UnauthorizedError } from '../errors/custom_errors/unauthorized.error';

// Middleware de autenticación
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  console.log('entrando a autenticate', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //TODO: Enviar error correcto
    const error = new UnauthorizedError(
      'No se proporcionó token de autenticación'
    );
    next(error);
  }

  const token = authHeader ? authHeader.split(' ')[1] : '';

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtUserPayload;
    req.user = decoded;
    next();
  } catch (error) {
    //enviamos error al siguiente middleware
    next(error);
  }
};
