// src/core/config/index.ts
import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env.test';

const finalPath = path.resolve(__dirname, `../../../deploy/${env}`);

dotenv.config({ path: finalPath });

export interface IConfig {
  host: string;
  port: number;
  appName: string;
  environment: 'development' | 'test' | 'production';
  debug: boolean;
  secretKey: string;
  allowedOrigins: string;
  dbUrl: string;
  apiUrl: string;
  jwtSecret: string;
}

function loadConfig(): IConfig {
  return {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    appName: process.env.APP_NAME || 'Ecommerce-test',
    environment:
      (process.env.ENVIRONMENT as 'development' | 'test' | 'production') ||
      'development',
    debug: process.env.DEBUG === 'true',
    secretKey: process.env.SECRET_KEY || 'supersecretkey',
    allowedOrigins: process.env.ALLOWED_ORIGINS || '*',
    dbUrl:
      process.env.DATABASE_URL ||
      'postgresql://postgres:admin@localhost:5432/e-commerce-db',
    apiUrl: process.env.API_URL || 'http://localhost:8000',
    jwtSecret: process.env.JWT_SECRET || 'superSecretKey',
  };
}

const config = loadConfig();
export default config;
