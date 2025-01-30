// src/core/infrastructure/errors/NotFoundError.ts
import { ApiError } from './api_error';

export class NotFoundError extends ApiError {
  constructor(entity: string) {
    // 404: Recurso no encontrado
    super('NotFoundError', 404, `${entity} not found`);
  }
}
