// src/core/infrastructure/errors/BaseError.ts
export abstract class BaseError extends Error {
    public readonly name: string;
    public readonly httpCode: number;
    public readonly isOperational: boolean;
  
    constructor(
      name: string,
      httpCode: number,
      description: string,
      isOperational: boolean
    ) {
      super(description);
  
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = name;
      this.httpCode = httpCode;
      this.isOperational = isOperational;
      if ((Error as any).captureStackTrace) {
        (Error as any).captureStackTrace(this);
      }    }
  }