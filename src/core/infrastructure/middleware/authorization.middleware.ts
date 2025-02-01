import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/custom_errors/unauthorized.error';
import { ForbiddenError } from '../errors/custom_errors/forbidden.error';
export const authorizeRole = (allowedRoles: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('entrando a authorized');
    if (!req.user) {
      const error = new UnauthorizedError(
        'El usuario no se encuentra autorizado'
      );
      next(error);
    }

    if (!allowedRoles.includes(req.user.role)) {
      const error = new ForbiddenError(
        'No tienes permisos para realizar esta acción'
      );
      next(error);
    }

    next();
  };
};
