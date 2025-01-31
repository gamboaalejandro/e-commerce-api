export const createUserSchema = {
  description: 'Registro de un nuevo usuario',
  tags: ['Auth'],
  body: {
    type: 'object',
    required: ['username', 'email', 'password'],

    properties: {
      username: { type: 'string', minLength: 3 },
      address: { type: ['string'] }, //
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 6 },
      role: { type: 'integer', default: 1 },
    },
  },
  response: {
    201: {
      description: 'Usuario creado exitosamente',
      type: 'object',
      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'integer' },
        createdAt: { type: 'string', format: 'date-time' },
      },
    },
    409: {
      description: 'El usuario ya existe (email o username en uso)',
      type: 'object',
      oneOf: [
        {
          properties: {
            error: { type: 'string', example: 'ConflictError' },
            message: { type: 'string', example: 'User email already exists' },
            statusCode: { type: 'integer', example: 409 },
          },
        },
        {
          properties: {
            error: { type: 'string', example: 'ConflictError' },
            message: { type: 'string', example: 'Username already exists' },
            statusCode: { type: 'integer', example: 409 },
          },
        },
      ],
    },
  },
};

export const updateUserSchema = {
  description: 'Actualización de datos del usuario',
  tags: ['Users'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
    required: ['id'],
  },
  body: {
    type: 'object',
    properties: {
      username: { type: 'string', minLength: 3, nullable: true },
      address: { type: 'string', nullable: true },
      email: { type: 'string', format: 'email', nullable: true },
    },
  },
  response: {
    200: {
      description: 'Usuario actualizado correctamente',
      type: 'object',
      properties: {
        status: { type: 'integer', example: 200 },
        message: { type: 'string', example: 'User updated successfully' },
      },
    },
    404: {
      description: 'Usuario no encontrado',
      type: 'object',
      properties: {
        error: { type: 'string', example: 'NotFoundError' },
        message: { type: 'string', example: 'User not found' },
        statusCode: { type: 'integer', example: 404 },
      },
    },
  },
};

export const deleteUserSchema = {
  description: 'Eliminación de un usuario',
  tags: ['Users'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
    required: ['id'],
  },
  response: {
    200: {
      description: 'Usuario eliminado correctamente',
      type: 'object',
      properties: {
        status: { type: 'integer', example: 200 },
        message: { type: 'string', example: 'User deleted successfully' },
      },
    },
    404: {
      description: 'Usuario no encontrado',
      type: 'object',
      properties: {
        error: { type: 'string', example: 'NotFoundError' },
        message: { type: 'string', example: 'User not found' },
        statusCode: { type: 'integer', example: 404 },
      },
    },
  },
};

export const getAllUsersSchema = {
  description: 'Obtener todos los usuarios con paginación',
  tags: ['Users'],
  querystring: {
    type: 'object',
    properties: {
      offset: { type: 'integer', minimum: 1, default: 1 },
      limit: { type: 'integer', minimum: 1, default: 10 },
    },
  },
  response: {
    200: {
      description: 'Lista de usuarios paginada',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          username: { type: 'string' },
          email: { type: 'string' },
          role: { type: 'integer' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
};

export const getCurrentUserSchema = {
  description: 'Obtener un usuario por ID',
  tags: ['Users'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
    required: ['id'],
  },
  response: {
    200: {
      description: 'Información del usuario',
      type: 'object',
      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'integer' },
        createdAt: { type: 'string', format: 'date-time' },
      },
    },
    404: {
      description: 'Usuario no encontrado',
      type: 'object',
      properties: {
        error: { type: 'string', example: 'NotFoundError' },
        message: { type: 'string', example: 'User not found' },
        statusCode: { type: 'integer', example: 404 },
      },
    },
  },
};
