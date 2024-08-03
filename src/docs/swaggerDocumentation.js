/**
 * @swagger
 * /login:
 *   post:
 *     description: Faz login do usuário
 *     responses:
 *       200:
 *         description: Sucesso no login
 */

/**
 * @swagger
 * /:
 *   get:
 *     description: Lista todos os eventos
 *     responses:
 *       200:
 *         description: Lista de eventos
 */

/**
 * @swagger
 * /{id}:
 *   get:
 *     description: Obtém um evento pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do evento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento encontrado
 */

/**
 * @swagger
 * /:
 *   post:
 *     description: Cria um novo evento
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 */

/**
 * @swagger
 * /{id}:
 *   put:
 *     description: Atualiza um evento pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do evento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 */

/**
 * @swagger
 * /{id}:
 *   delete:
 *     description: Deleta um evento pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do evento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento deletado com sucesso
 */
