import { db } from '../db/database.js';

export async function getAllList(offset) {
  return db
    .execute(
      `
      SELECT BIN_TO_UUID(msg_id, 1) AS msg_id, content, type, time, image, created, updated, user, version FROM data ORDER BY created DESC LIMIT 20 OFFSET (?);`,
      [offset]
    ) //
    .then((result) => result[0]);
}

export async function getByMsgId(msgId) {
  return db
    .execute(
      `SELECT BIN_TO_UUID(msg_id, 1) AS msg_id, content, type, image, created, updated, user, version FROM data WHERE msg_id= UUID_TO_BIN(?,1)`,
      [msgId]
    ) //
    .then((result) => result[0][0]);
}

export async function createList(content, type, image, user, version, time) {
  return db.execute(
    `INSERT INTO data (content, type, time, image, user, version) VALUES (?,?,?,?,?,?)`,
    [content, type, time, image, user, version]
  );
}

export async function updateList(msgId, content) {
  return db.execute(`UPDATE data SET content=? WHERE msg_id=UUID_TO_BIN(?,1)`, [
    content,
    msgId,
  ]);
}

export async function deleteList(msgId) {
  return db.execute(`DELETE FROM data WHERE msg_id=UUID_TO_BIN(?,1)`, [msgId]);
}
