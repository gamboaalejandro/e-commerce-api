// src/core/infrastructure/errors/ConflictError.ts
import { ApiError } from './api_error';

export class ConflictError extends ApiError {
  constructor(message = 'Conflict') {
    // 409: Conflicto (p.ej. registro duplicado)
    super('ConflictError', 409, message);
  }
}