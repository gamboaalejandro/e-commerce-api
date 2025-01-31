export const createProductSchema = {
  description: 'Crea un nuevo producto',
  tags: ['Products'],
  body: {
    type: 'object',
    required: ['name', 'description', 'price', 'stock'],
    properties: {
      name: { type: 'string', minLength: 3 },
      description: { type: 'string', minLength: 10 },
      price: { type: 'number', minimum: 0.01 },
      stock: { type: 'integer', minimum: 0 },
      is_active: { type: 'boolean', default: true },
    },
  },
  response: {
    201: {
      description: 'Producto creado exitosamente',
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        stock: { type: 'integer' },
        is_active: { type: 'boolean' },
        created_at: { type: 'string', format: 'date-time' },
      },
    },
    409: {
      description: 'El producto ya existe',
      type: 'object',
      properties: {
        error: { type: 'string', example: 'ConflictError' },
        message: { type: 'string', example: 'Product already exists' },
        statusCode: { type: 'integer', example: 409 },
      },
    },
  },
};

export const getProductSchema = {
  description: 'Obtiene un producto por ID',
  tags: ['Products'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
    required: ['id'],
  },
  response: {
    200: {
      description: 'Detalles del producto',
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        stock: { type: 'integer' },
        is_active: { type: 'boolean' },
        created_at: { type: 'string', format: 'date-time' },
      },
    },
    404: {
      description: 'Producto no encontrado',
      type: 'object',
      properties: {
        error: { type: 'string', example: 'NotFoundError' },
        message: { type: 'string', example: 'Product not found' },
        statusCode: { type: 'integer', example: 404 },
      },
    },
  },
};

export const updateProductSchema = {
  description: 'Actualiza un producto existente',
  tags: ['Products'],
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
      name: { type: 'string', minLength: 3 },
      description: { type: 'string', minLength: 10 },
      price: { type: 'number', minimum: 0.01 },
      stock: { type: 'integer', minimum: 0 },
      is_active: { type: 'boolean' },
    },
  },
  response: {
    200: {
      description: 'Producto actualizado exitosamente',
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        stock: { type: 'integer' },
        is_active: { type: 'boolean' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    },
    404: {
      description: 'Producto no encontrado',
      type: 'object',
      properties: {
        error: { type: 'string', example: 'NotFoundError' },
        message: { type: 'string', example: 'Product not found' },
        statusCode: { type: 'integer', example: 404 },
      },
    },
  },
};

export const deleteProductSchema = {
  description: 'Elimina un producto por ID (borrado lógico)',
  tags: ['Products'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
    required: ['id'],
  },
  response: {
    204: {
      description: 'Producto eliminado exitosamente',
      type: 'null',
    },
    404: {
      description: 'Producto no encontrado',
      type: 'object',
      properties: {
        error: { type: 'string', example: 'NotFoundError' },
        message: { type: 'string', example: 'Product not found' },
        statusCode: { type: 'integer', example: 404 },
      },
    },
  },
};

export const getAllProductsSchema = {
  description: 'Obtener la lista de productos con paginación',
  tags: ['Product'],
  querystring: {
    type: 'object',
    properties: {
      skip: { type: 'integer', minimum: 0, default: 0 },
      take: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
    },
  },
  response: {
    200: {
      description: 'Lista de productos',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'number' },
          stock: { type: 'integer' },
          is_active: { type: 'boolean' },
          created_at: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
};
