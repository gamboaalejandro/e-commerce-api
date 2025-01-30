// src/core/infrastructure/errors/ApiError.ts
import { BaseError } from '../base_error';

export class ApiError extends BaseError {
  constructor(
    name: string,
    httpCode = 400,
    description = 'bad request',
    isOperational = true
  ) {
    super(name, httpCode, description, isOperational);
  }
}