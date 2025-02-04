import { body, param, query } from 'express-validator';

export const createOrderValidator = [
  body('user_id').isUUID().withMessage('Invalid user_id format (must be UUID)'),

  body('address').optional().isString().withMessage('address must be a string'),

  body('order_type')
    .isString()
    .isIn(['pickup', 'delivery'])
    .withMessage("order_type must be one of: 'pickup', 'delivery'"),

  body('products')
    .isArray({ min: 1 })
    .withMessage('products must be a non-empty array'),

  body('products.*.product_id')
    .isUUID()
    .withMessage('Invalid product_id format (must be UUID)'),

  body('products.*.quantity')
    .isInt({ min: 1 })
    .withMessage('quantity must be an integer greater than or equal to 1'),
];

export const getOrderByIdValidator = [
  param('id').isUUID().withMessage('Invalid order ID format (must be UUID)'),
];

export const updateOrderValidator = [
  param('id').isUUID().withMessage('Invalid order ID format (must be UUID)'),

  body('address').optional().isString().withMessage('address must be a string'),

  body('order_state')
    .optional()
    .isString()
    .isIn(['PENDIENTE', 'EN_PROCESO', 'FINALIZADO', 'CANCELADO'])
    .withMessage(
      "order_state must be one of: 'PENDIENTE', 'EN_PROCESO', 'FINALIZADO', 'CANCELADO'"
    ),
];

export const deleteOrderValidator = [
  param('id').isUUID().withMessage('Invalid order ID format (must be UUID)'),
];

export const getAllOrdersValidator = [
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset must be an integer greater than or equal to 0')
    .toInt(),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('limit must be an integer between 1 and 100')
    .toInt(),
];

export const cancelOrderValidator = [
  param('id').isUUID().withMessage('Invalid order ID format (must be UUID)'),
];
