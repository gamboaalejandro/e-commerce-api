import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API',
      version: '1.0.0',
      description:
        'API para la gestión de productos, órdenes y usuarios en un sistema de comercio electrónico.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['src/**/**/docs/*.docs.ts'], // Incluir rutas de la API
};

export default swaggerJsDoc(swaggerOptions);
