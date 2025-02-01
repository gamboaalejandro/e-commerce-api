import { body, param, query } from 'express-validator';

/**
 * Validaciones para la creación de productos
 */
export const createProductValidator = [
  body('name')
    .isString()
    .isLength({ min: 3 })
    .withMessage('El nombre debe tener al menos 3 caracteres'),

  body('description')
    .isString()
    .isLength({ min: 10 })
    .withMessage('La descripción debe tener al menos 10 caracteres'),

  body('price')
    .isFloat({ min: 0.01 })
    .withMessage('El precio debe ser un número mayor a 0'),

  body('stock')
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero mayor o igual a 0'),

  body('is_active')
    .optional()
    .isBoolean()
    .withMessage('El campo is_active debe ser un booleano'),
];

/**
 * Validaciones para obtener un producto por ID
 */
export const getProductValidator = [
  param('id')
    .isUUID()
    .withMessage('El ID del producto debe ser un UUID válido'),
];

/**
 * Validaciones para actualizar un producto
 */
export const updateProductValidator = [
  param('id')
    .isUUID()
    .withMessage('El ID del producto debe ser un UUID válido'),

  body('name')
    .optional()
    .isString()
    .isLength({ min: 3 })
    .withMessage('El nombre debe tener al menos 3 caracteres'),

  body('description')
    .optional()
    .isString()
    .isLength({ min: 10 })
    .withMessage('La descripción debe tener al menos 10 caracteres'),

  body('price')
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage('El precio debe ser un número mayor a 0'),

  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero mayor o igual a 0'),

  body('is_active')
    .optional()
    .isBoolean()
    .withMessage('El campo is_active debe ser un booleano'),
];

/**
 * Validaciones para eliminar un producto por ID
 */
export const deleteProductValidator = [
  param('id')
    .isUUID()
    .withMessage('El ID del producto debe ser un UUID válido'),
];

/**
 * Validaciones para obtener todos los productos con paginación
 */
export const getAllProductsValidator = [
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El offset debe ser un número entero mayor o igual a 0'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('El límite debe estar entre 1 y 100'),
];
