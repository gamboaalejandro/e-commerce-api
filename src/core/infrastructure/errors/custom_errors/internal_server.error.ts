// src/core/infrastructure/errors/InternalServerError.ts
import { ApiError } from './api_error';

export class InternalServerError extends ApiError {
  constructor(message = 'Internal Server Error') {
    super('InternalServerError', 500, message, false);
  }
}