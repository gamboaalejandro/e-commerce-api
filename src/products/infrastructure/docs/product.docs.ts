/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operaciones relacionadas con los productos
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
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           example: "Shampoo Natural"
 *         description:
 *           type: string
 *           example: "Shampoo natural sin químicos dañinos"
 *         price:
 *           type: number
 *           example: 15.99
 *         stock:
 *           type: integer
 *           example: 100
 *         is_active:
 *           type: boolean
 *           example: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-30T10:00:00.000Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2024-02-01T12:00:00.000Z"
 */

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, price, stock]
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *               description:
 *                 type: string
 *                 minLength: 10
 *               price:
 *                 type: number
 *                 minimum: 0.01
 *               stock:
 *                 type: integer
 *                 minimum: 0
 *               is_active:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       409:
 *         description: El producto ya existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ConflictError"
 *                 message:
 *                   type: string
 *                   example: "Product already exists"
 *                 statusCode:
 *                   type: integer
 *                   example: 409
 */

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Obtener un producto por su ID
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del producto a buscar
 *     responses:
 *       200:
 *         description: Detalles del producto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
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
 *                   example: "Product not found"
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 */

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Actualizar un producto existente
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *               description:
 *                 type: string
 *                 minLength: 10
 *               price:
 *                 type: number
 *                 minimum: 0.01
 *               stock:
 *                 type: integer
 *                 minimum: 0
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Eliminar un producto por su ID (borrado lógico)
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del producto a eliminar
 *     responses:
 *       204:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 */
