/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome message for the events management API
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 msg:
 *                   type: string
 */

/**
 * @swagger
 * /login:
 *   post:
 *     description: User login
 *     responses:
 *       200:
 *         description: Sucesso
 */

/**
 * @swagger
 * /register:
 *   post:
 *     description: User registration
 *     responses:
 *       200:
 *         description: Sucesso
 */

/**
 * @swagger
 * /update/:
 *   put:
 *     description: Update user information
 *     responses:
 *       200:
 *         description: Sucesso
 */
e;
/**
 * @swagger
 * /events/:
 *   get:
 *     description: List all events
 *     responses:
 *       200:
 *         description: Sucesso
 */

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     description: Get event by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso
 */

/**
 * @swagger
 * /events/create:
 *   post:
 *     description: Create a new event
 *     responses:
 *       200:
 *         description: Sucesso
 */

/**
 * @swagger
 * /events/update:
 *   put:
 *     description: Update an event
 *     responses:
 *       200:
 *         description: Sucesso
 */

/**
 * @swagger
 * /events/delete/{id}:
 *   delete:
 *     description: Delete an event by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso
 */
/**
 * @swagger
 * /admin/createAdmin:
 *   patch:
 *     description: Create a new admin
 *     responses:
 *       200:
 *         description: Sucesso
 */

/**
 * @swagger
 * /admin/delete/{id}:
 *   delete:
 *     description: Delete a user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso
 */
