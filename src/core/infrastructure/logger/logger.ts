import { FastifyRequest as Request } from 'fastify';

export interface ILogger {
  log(level: string, req: Request | undefined, message: string): void;
  error(req: Request | undefined, message: string): void;
  warn(req: Request | undefined, message: string): void;
  info(req: Request | undefined, message: string): void;
  debug(req: Request | undefined, message: string): void;
  silly(req: Request | undefined, message: string): void;
}
