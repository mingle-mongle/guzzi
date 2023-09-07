import express from 'express';
import * as listController from '../controller/list.js';

const router = express.Router();

// paging query O
// GET /lists
/**
 * @swagger
 * paths:
 *   /lists?page={pageNumber}:
 *    get:
 *      tags: [메세지]
 *      summary: 메세지 정보 SELECT 요청
 *      description: 메세지 한 페이지씩 가져오기  * 1 page:20개
 *      parameters:
 *        - name: page
 *          in: query
 *          description: 불러올 페이지 번호 (최솟값 1)
 *          required: true
 *          schema:
 *            type : integer
 *            format: int64
 *            minimum: 1
 *            example: 1
 *      responses:
 *        200:
 *          description: OK 메세지 데이터 반환
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/list'
 *        400:
 *          description: Bad Request 잘못된 요청
 *          parameters:
 *              schema:
 *                type: object
 *                properties:
 *                  error: string
 *                example:
 *                  error: "Error: Page validate Error"
 */
router.get('/lists', listController.getAllList);
router.get('/listsCount', listController.getAllListCount);
// GET /lists?msgId=msgId -> query
/**
 * @swagger
 * paths:
 *   /list/{msgId}:
 *    get:
 *      tags: [메세지]
 *      summary: 메세지 아이디로 구분하여 메세지 정보 SELECT 요청
 *      description: 메세지 아이디로 구분하여 메세지 가져오기
 *      parameters:
 *        - name: msgId
 *          in: path
 *          description: 메세지 아이디
 *      responses:
 *        200:
 *          description: OK 들어 간 데이터가 다시 반환
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/list'
 *        '404':
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/list/:msgId', listController.getList);

// Post /lists
/**
 * @swagger
 * paths:
 *   /lists:
 *    post:
 *      tags: [메세지]
 *      summary: 메세지 정보와 유저 정보를 POST 요청
 *      description: 메세지 정보와 유저 정보를 DB에 생성
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                content:
 *                  type: string
 *                type:
 *                  type: string
 *                image:
 *                  type: string
 *                user:
 *                  type: object
 *                version:
 *                  type: string
 *              example:
 *                content: New Message!
 *                type: message
 *                image: data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/
 *                user: {
 *                  ip: 127.0.0.1,
 *                  role: usexs,
 *                  uuid: bb7d7bee-1ef6-4b0a-811d-752ac8efb860,
 *                  device_id: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
 *                }
 *                version: v1
 *      responses:
 *        201:
 *          description: Created 메세지 데이터 등록 완료
 *        '404':
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/lists', listController.createList);

// Put /lists/:id -> params
/**
 * @swagger
 * paths:
 *   /list/{msgId}:
 *    put:
 *      tags: [메세지]
 *      summary: 메세지아이디로 구분하여 메세지 정보 PUT 요청
 *      description: 메세지 내용 수정
 *      required: true
 *      parameters:
 *        - name: msgId
 *          in: path
 *          description: 메세지 아이디
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                content:
 *                  type: string
 *      responses:
 *        204:
 *          description: No Content 수정 완료
 *        '404':
 *         description: Not found Validation 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/list/:msgId', listController.updateList);

/**
 * @swagger
 * paths:
 *   /list/{msgId}:
 *    delete:
 *      tags: [메세지]
 *      summary: 메세지 DELETE 요청
 *      description: 메세지 정보 삭제
 *      parameters:
 *        - name: msgId
 *          in: path
 *          description: 메세지 아이디
 *      responses:
 *        204:
 *          description: No Content 데이터 삭제 완료
 *        '404':
 *         description: Not found Validation 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/list/:msgId', listController.deleteList);

export default router;
