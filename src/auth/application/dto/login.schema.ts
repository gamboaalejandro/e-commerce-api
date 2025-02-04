export const loginUserSchema = {
  description: 'Inicio de sesión de usuario',
  tags: ['Auth'],
  body: {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: { type: 'string', minLength: 3 },
      password: { type: 'string', minLength: 6 },
    },
  },
  response: {
    200: {
      description: 'Inicio de sesión exitoso',
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
    401: {
      description: 'Credenciales incorrectas',
      type: 'object',
      properties: {
        error: { type: 'string', example: 'UnauthorizedError' },
        message: {
          type: 'string',
          example: 'Invalid username or password',
        },
        statusCode: { type: 'integer', example: 401 },
      },
    },
    409: {
      description: 'Cuenta desactivada',
      type: 'object',
      properties: {
        error: { type: 'string', example: 'ConflictError' },
        message: {
          type: 'string',
          example: 'User account is deactivated',
        },
        statusCode: { type: 'integer', example: 409 },
      },
    },
  },
};
