/**
 * @swagger
 *  components:
 *  schemas:
 *   list:
 *     properties:
 *      msgId:
 *        type: string
 *        format: uuid
 *        description: 메세지 고유 번호
 *      content:
 *        type: string
 *        description: 메세지 내용
 *        example: '새로운 메세지'
 *      type:
 *        type: string
 *        description: 메세지 타입 (메세지/이미지)
 *      time:
 *        type: integer
 *        description: UTC Time
 *        example: 1692277482
 *      image:
 *        type: string
 *        description: 이미지 (base64)
 *        example: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/"
 *      created:
 *        type: string
 *        format: date-time
 *        description: 메세지 생성 시간
 *      updated:
 *        type: string
 *        format: date-time
 *        description: 메세지 수정 시간
 *      user:
 *        type: object
 *        description: 유저 정보
 *        properties:
 *          ip:
 *            type: string
 *            format: ipv4
 *            description: 유저의 ip
 *          role:
 *            type: string
 *            description: 유저 권한 (user, admin)
 *          uuid:
 *            type: string
 *            format: uuid
 *            description: 유저의 uuid
 *          device_id:
 *            type: string
 *            description: 유저의 device_id
 *      version:
 *        type: string
 *        description: 버전 정보
 *        example: 'v1'
 *
 */

/**
 * @swagger
 *  components:
 *  schemas:
 *    Error:
 *     properties:
 *      error:
 *        type: string
 *        description : 에러 정보
 *        example: 'Error: ___ validate Error'
 */
