export const createOrderSchema = {
  description: 'Crear una nueva orden',
  tags: ['Order'],
  security: [{ bearerAuth: [] }],
  body: {
    type: 'object',
    security: [{ bearerAuth: [] }],
    required: ['user_id', 'total_price', 'order_type', 'products'],
    properties: {
      user_id: { type: 'string', format: 'uuid' },
      total_price: { type: 'number', minimum: 0 },
      address: { type: 'string' },
      order_type: { type: 'string', enum: ['pickup', 'delivery'] },
      products: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          required: ['product_id', 'quantity'],
          properties: {
            product_id: { type: 'string', format: 'uuid' },
            quantity: { type: 'integer', minimum: 1 },
          },
        },
      },
    },
  },
  response: {
    201: {
      description: 'Orden creada exitosamente',
      type: 'object',
      properties: {
        id: { type: 'string' },
        user_id: { type: 'string' },
        total_price: { type: 'number' },
        address: { type: 'string' },
        order_type: { type: 'string' },
        order_state: { type: 'string' },
        created_at: { type: 'string', format: 'date-time' },
      },
    },
  },
};

export const getOrderByIdSchema = {
  description: 'Obtener una orden por su ID',
  tags: ['Order'],
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
    required: ['id'],
  },
  response: {
    200: {
      description: 'Orden encontrada',
      type: 'object',
      properties: {
        id: { type: 'string' },
        user_id: { type: 'string' },
        total_price: { type: 'number' },
        address: { type: 'string' },
        order_type: { type: 'string' },
        order_state: { type: 'string' },
        created_at: { type: 'string', format: 'date-time' },
        products: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              product_id: { type: 'string' },
              quantity: { type: 'integer' },
              subtotal: { type: 'number' },
            },
          },
        },
      },
    },
    404: {
      description: 'Orden no encontrada',
      type: 'object',
      properties: {
        error: { type: 'string', example: 'NotFoundError' },
        message: { type: 'string', example: 'Order not found' },
        statusCode: { type: 'integer', example: 404 },
      },
    },
  },
};
export const updateOrderSchema = {
  description: 'Actualizar una orden existente',
  security: [{ bearerAuth: [] }],
  tags: ['Order'],
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
      address: { type: 'string' },
      order_state: {
        type: 'string',
        enum: ['PENDIENTE', 'EN_PROCESO', 'FINALIZADO', 'CANCELADO'],
      },
    },
  },
  response: {
    200: {
      description: 'Orden actualizada exitosamente',
      type: 'object',
      properties: {
        id: { type: 'string' },
        user_id: { type: 'string' },
        total_price: { type: 'number' },
        address: { type: 'string' },
        order_type: { type: 'string' },
        order_state: { type: 'string' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    },
    404: {
      description: 'Orden no encontrada',
      type: 'object',
      properties: {
        error: { type: 'string', example: 'NotFoundError' },
        message: { type: 'string', example: 'Order not found' },
        statusCode: { type: 'integer', example: 404 },
      },
    },
  },
};

export const deleteOrderSchema = {
  description: 'Eliminar una orden por su ID',
  tags: ['Order'],
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
    required: ['id'],
  },
  response: {
    204: {
      description: 'Orden eliminada exitosamente',
      type: 'null',
    },
    404: {
      description: 'Orden no encontrada',
      type: 'object',
      properties: {
        error: { type: 'string', example: 'NotFoundError' },
        message: { type: 'string', example: 'Order not found' },
        statusCode: { type: 'integer', example: 404 },
      },
    },
  },
};

export const getAllOrdersSchema = {
  description: 'Obtener la lista de órdenes con paginación',
  security: [{ bearerAuth: [] }],
  tags: ['Order'],
  querystring: {
    type: 'object',
    properties: {
      offset: { type: 'integer', minimum: 0, default: 0 },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
    },
  },
  response: {
    200: {
      description: 'Lista de órdenes',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          user_id: { type: 'string' },
          total_price: { type: 'number' },
          address: { type: 'string' },
          order_type: { type: 'string' },
          order_state: { type: 'string' },
          created_at: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
};

export const updateOrderStatusSchema = {
  description: 'Actualizar solo el estado de una orden',
  tags: ['Order'],
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
    required: ['id'],
  },
  body: {
    type: 'object',
    required: ['order_state'],
    properties: {
      order_state: {
        type: 'string',
        enum: ['PENDIENTE', 'EN_PROCESO', 'FINALIZADO', 'CANCELADO'],
      },
    },
  },
  response: {
    200: {
      description: 'Estado de la orden actualizado',
      type: 'object',
      properties: {
        id: { type: 'string' },
        order_state: { type: 'string' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    },
    404: {
      description: 'Orden no encontrada',
      type: 'object',
      properties: {
        error: { type: 'string', example: 'NotFoundError' },
        message: { type: 'string', example: 'Order not found' },
        statusCode: { type: 'integer', example: 404 },
      },
    },
  },
};

export const cancelOrderSchema = {
  description: 'Cancelar una orden cambiando su estado a CANCELADO',
  tags: ['Order'],
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
    required: ['id'],
  },
  response: {
    200: {
      description: 'Orden cancelada exitosamente',
      type: 'object',
      properties: {
        id: { type: 'string' },
        order_state: { type: 'string', example: 'CANCELADO' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    },
    404: {
      description: 'Orden no encontrada',
      type: 'object',
      properties: {
        error: { type: 'string', example: 'NotFoundError' },
        message: { type: 'string', example: 'Order not found' },
        statusCode: { type: 'integer', example: 404 },
      },
    },
  },
};
