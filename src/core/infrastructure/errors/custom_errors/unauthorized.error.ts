// src/core/infrastructure/errors/UnauthorizedError.ts
import { ApiError } from './api_error';

export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    // 401: No autorizado (sin credenciales válidas)
    super('UnauthorizedError', 401, message);
  }
}
