/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Operaciones relacionadas con órdenes de compra
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         user_id:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         total_price:
 *           type: number
 *           example: 99.99
 *         address:
 *           type: string
 *           example: "123 Main St, City"
 *         order_type:
 *           type: string
 *           enum: [pickup, delivery]
 *           example: "delivery"
 *         order_state:
 *           type: string
 *           enum: [PENDIENTE, EN_PROCESO, FINALIZADO, CANCELADO]
 *           example: "PENDIENTE"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-30T10:00:00.000Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-31T12:00:00.000Z"
 */

/**
 * @swagger
 * /api/order:
 *   post:
 *     summary: Crear una nueva orden
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id, total_price, order_type, products]
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               address:
 *                 type: string
 *               order_type:
 *                 type: string
 *                 enum: [pickup, delivery]
 *               products:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required: [product_id, quantity]
 *                   properties:
 *                     product_id:
 *                       type: string
 *                       format: uuid
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /api/order/{id}:
 *   get:
 *     summary: Obtener una orden por su ID
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la orden a buscar
 *     responses:
 *       200:
 *         description: Orden encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Orden no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "NotFoundError"
 *                 message:
 *                   type: string
 *                   example: "Order not found"
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 */

/**
 * @swagger
 * /api/order/{id}:
 *   put:
 *     summary: Actualizar una orden existente
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la orden a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *               order_state:
 *                 type: string
 *                 enum: [PENDIENTE, EN_PROCESO, FINALIZADO, CANCELADO]
 *     responses:
 *       200:
 *         description: Orden actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Orden no encontrada
 */

/**
 * @swagger
 * /api/order/{id}:
 *   delete:
 *     summary: Eliminar una orden por su ID
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la orden a eliminar
 *     responses:
 *       204:
 *         description: Orden eliminada exitosamente
 *       404:
 *         description: Orden no encontrada
 */

/**
 * @swagger
 * /api/order:
 *   get:
 *     summary: Obtener la lista de órdenes con paginación
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Número de órdenes a saltar
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Número de órdenes a devolver
 *     responses:
 *       200:
 *         description: Lista de órdenes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /api/order/{id}/cancel:
 *   patch:
 *     summary: Cancelar una orden
 *     description: Cambia el estado de una orden a "CANCELADO".
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la orden a cancelar
 *     responses:
 *       200:
 *         description: Orden cancelada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 order_state:
 *                   type: string
 *                   example: "CANCELADO"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Formato inválido del ID de la orden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "BadRequestError"
 *                 message:
 *                   type: string
 *                   example: "Invalid order ID format (must be UUID)"
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *       404:
 *         description: Orden no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "NotFoundError"
 *                 message:
 *                   type: string
 *                   example: "Order not found"
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "InternalServerError"
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 */
