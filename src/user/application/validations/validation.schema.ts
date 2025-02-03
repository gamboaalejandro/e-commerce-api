import { body, param, query } from 'express-validator';

/**
 * ✅ Validación para crear un usuario
 */
export const createUserValidator = [
  body('username')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('address').optional().isString().withMessage('Address must be a string'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role').optional().isInt().withMessage('Role must be an integer'),
];

/**
 * ✅ Validación para actualizar un usuario
 */
export const updateUserValidator = [
  param('id').isUUID().withMessage('Invalid user ID format'),
  body('username')
    .optional()
    .isString()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('address').optional().isString().withMessage('Address must be a string'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
];

/**
 * ✅ Validación para eliminar un usuario
 */
export const deleteUserValidator = [
  param('id').isUUID().withMessage('Invalid user ID format'),
];

/**
 * ✅ Validación para obtener un usuario por ID
 */
export const getCurrentUserValidator = [
  param('id').isUUID().withMessage('Invalid user ID format'),
];

/**
 * ✅ Validación para obtener todos los usuarios con paginación
 */
export const getAllUsersValidator = [
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be an integer greater than or equal to 1'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be an integer between 1 and 100'),
];

/**
 * ✅ Validación para el login de usuario
 */
export const loginUserValidator = [
  body('username')
    .isString()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('password')
    .isString()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];
