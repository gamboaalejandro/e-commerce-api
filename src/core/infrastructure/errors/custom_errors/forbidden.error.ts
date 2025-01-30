// src/core/infrastructure/errors/ForbiddenError.ts
import { ApiError } from './api_error';

export class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden') {
    // 403: Autenticado, pero sin permisos
    super('ForbiddenError', 403, message);
  }
}
