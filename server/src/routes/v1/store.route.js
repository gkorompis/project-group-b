const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const storeValidation = require('../../validations/store.validation');
const storeController = require('../../controllers/store.controller');

const router = express.Router();

// /v1/stores
router
  .route('/')
  .post(auth('manageStores'), validate(storeValidation.createStore), storeController.createStore)
  .get(auth('getStores'), validate(storeValidation.getStores), storeController.getStores);

// /v1/stores/:storeId
// ex: /v1/stores/c584dbe
router
  .route('/:storeId')
  .get(auth('getStores'), validate(storeValidation.getStore), storeController.getStore)
  .patch(auth('manageStores'), validate(storeValidation.updateStore), storeController.updateStore)
  .delete(auth('manageStores'), validate(storeValidation.deleteStore), storeController.deleteStore);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Stores
 *   description: Store management and retrieval
 */

/**
 * @swagger
 * /stores:
 *   post:
 *     summary: create a store
 *     description: Only admins can create other stores.
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_store
 *               - id_user
 *               - store_name
 *               - store_category
 *             properties:
 *               id_store:
 *                 type: string
 *               id_user:
 *                 type: string
 *               store_name:
 *                 type: string
 *               store_category:
 *                 type: string
 *             example:
 *               id_store: 001
 *               id_user: 6581c9316db0546e2407383f
 *               store_name: Test task
 *               store_category: enum store_category
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Store'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all stores
 *     description: Only admins can retrieve all stores.
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id_store
 *         schema:
 *           type: string
 *       - in: query
 *         name: id_user
 *         schema:
 *           type: string
 *       - in: query
 *         name: store_name
 *         schema:
 *           type: string
 *         description: Store name
 *      - in: query
 *         name: store_category
 *         schema:
 *           type: string
 *         description: Store Category
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of stores
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Store'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /stores/{id}:
 *   get:
 *     summary: Get a store
 *     description: Logged in stores can fetch only their own store information. Only admins can fetch other stores.
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Store id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Store'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a store
 *     description: Logged in stores can only update their own information. Only admins can update other stores.
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Store id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *             example:
 *               title: test task
 *               description: lorem ipsum
 *               priority: low
 *               dueDate: 29-10-2023
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Store'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a store
 *     description: Logged in stores can delete only themselves. Only admins can delete other stores.
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Store id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */