import { db } from '../db/database.js';

/**
 * 메세지 한 페이지씩 가져오기  * 1 page:20개
 * @param {number} offset 페이지 번호;
 * @returns DB에서 가져온 데이터
 */
export async function getAllList(offset, mainOffset) {
  return db
    .execute(
      `
      SELECT BIN_TO_UUID(msg_id, 0) AS msg_id, content, type, time, image, created, updated, user, version FROM data WHERE time >= (SELECT time FROM data LIMIT 1 OFFSET (?)) LIMIT 20 offset (?);`,
      [offset, mainOffset]
    ) //
    .then((result) => result[0]);
}
/**
 * 메세지 아이디로 구분하여 메세지 정보 SELECT 요청
 * @param {string} msgId 메세지아이디
 * @returns 메세지아이디를 기준으로 찾은 데이터
 */
export async function getByMsgId(msgId) {
  return db
    .execute(
      `SELECT BIN_TO_UUID(msg_id, 1) AS msg_id, content, type, image, created, updated, user, version FROM data WHERE msg_id= UUID_TO_BIN(?,1)`,
      [msgId]
    ) //
    .then((result) => result[0][0]);
}
/**
 * 메세지 정보와 유저 정보를 DB에 생성
 * @param {string} content 메세지 내용
 * @param {string} type 메세지 타입
 * @param {string} image 이미지
 * @param {object} user 유저 정보
 * @param {string} version 버전 정보
 * @param {number} time unixTime
 */
export async function createList(content, type, image, user, version, time) {
  return db.execute(
    `INSERT INTO data (content, type, time, image, user, version) VALUES (?,?,?,?,?,?)`,
    [content, type, time, image, user, version]
  );
}
/**
 * 메세지아이디로 구분하여 메세지 정보 PUT 요청
 * @param {string} msgId 메세지아이디
 * @param {string} content 메세지 내용
 */
export async function updateList(msgId, content) {
  return db.execute(`UPDATE data SET content=? WHERE msg_id=UUID_TO_BIN(?,1)`, [
    content,
    msgId,
  ]);
}
/**
 * 메세지 DELETE 요청
 * @param {string} msgId 메세지아이디
 */
export async function deleteList(msgId) {
  return db.execute(`DELETE FROM data WHERE msg_id=UUID_TO_BIN(?,1)`, [msgId]);
}
