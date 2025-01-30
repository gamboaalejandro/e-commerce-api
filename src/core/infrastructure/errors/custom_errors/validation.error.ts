// src/core/infrastructure/errors/ValidationError.ts
import { ApiError } from './api_error';

export class ValidationError extends ApiError {
  constructor(message: string) {
    // 422: Unprocessable Entity
    super('ValidationError', 422, message);
  }
}