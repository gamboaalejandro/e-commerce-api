import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { FastifyRequest as Request } from 'fastify'; // O  si usas Fastify
import { ILogger } from './logger';

const fileRotateTransportError = new DailyRotateFile({
  filename: 'logs/error_%DATE%',
  datePattern: 'YYYYMMDD',
  level: 'error',
  maxFiles: '15d',
  maxSize: '10m',
  extension: '.log',
});

const fileRotateTransport = new DailyRotateFile({
  filename: 'logs/audit_%DATE%',
  datePattern: 'YYYYMMDD',
  maxFiles: '15d',
  maxSize: '10m',
  extension: '.log',
});

const wlog = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    fileRotateTransport,
    fileRotateTransportError,
    new winston.transports.Console(),
  ],
});

/**
 * WinstonLogger:
 * Implementación de ILogger usando Winston + Daily Rotate File.
 */
export class WinstonLogger implements ILogger {
  private formatMessage(req: Request | undefined, message: string): string {
    // Comienza con fecha y hora
    let formatted = `${new Date().toISOString().slice(0, 10)} ${new Date().toLocaleTimeString()} `;

    // Si hay objeto req, imprime info útil
    if (req) {
      // Esto asume que `req.id` está definido de alguna manera (p.ej., con un middleware).
      // Si no lo tienes, elimínalo o cámbialo por algo que exista.
      formatted += `[reqId: ${req['id'] ?? 'n/a'}] `;
      if ('path' in req) {
        formatted += `[path: ${req['path']}] `;
      }
      // request body
      if (req['body']) {
        formatted += `[request: ${JSON.stringify(req['body'])}] `;
      }
    } else {
      // Si no hay req, imprime el raw data
      formatted += `[data: ${JSON.stringify(message)}] `;
    }

    // Agrega el mensaje final
    formatted += `[message: ${message}] `;
    return formatted;
  }

  log(level: string, req: Request | undefined, message: string): void {
    wlog.log(level, this.formatMessage(req, message));
  }

  error(req: Request | undefined, message: string): void {
    wlog.error(this.formatMessage(req, message));
  }

  warn(req: Request | undefined, message: string): void {
    wlog.warn(this.formatMessage(req, message));
  }

  info(req: Request | undefined, message: string): void {
    wlog.info(this.formatMessage(req, message));
  }

  debug(req: Request | undefined, message: string): void {
    wlog.debug(this.formatMessage(req, message));
  }

  silly(req: Request | undefined, message: string): void {
    wlog.silly(this.formatMessage(req, message));
  }
}
