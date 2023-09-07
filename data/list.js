import { db } from '../db/database.js';

export async function getAllList(offset, mainOffset) {
  return db
    .execute(
      // `
      // SELECT BIN_TO_UUID(msg_id, 1) AS msg_id, content, type, time, image, created, updated, user, version FROM bufferTest ORDER BY msg_id DESC LIMIT 20 OFFSET (?);`,
      // [offset]
      // `
      //   SELECT BIN_TO_UUID(msg_id, 1) AS msg_id, content, type, time, image, created, updated, user, version FROM (SELECT * FROM bufferTest ORDER BY msg_id DESC) AS Data LIMIT 20 OFFSET (?);`,
      // [offset]
      // `select * from bufferTest;`
      //
      `
        SELECT BIN_TO_UUID(msg_id, 1) AS msg_id, content, type, time, image, created, updated, user, version FROM bufferTest WHERE time >= (SELECT time FROM bufferTest LIMIT 1 OFFSET (?)) LIMIT 20 offset (?);`,
      [offset, mainOffset]
      // `select count(*) from bufferTest;`
    ) //
    .then((result) => result[0]);
  // .then((result) => result[0]);
}

export async function getListCount(offset, mainOffset) {
  return db
    .execute(
      // `
      // SELECT BIN_TO_UUID(msg_id, 1) AS msg_id, content, type, time, image, created, updated, user, version FROM bufferTest ORDER BY msg_id DESC LIMIT 20 OFFSET (?);`,
      // [offset]
      // `
      //   SELECT BIN_TO_UUID(msg_id, 1) AS msg_id, content, type, time, image, created, updated, user, version FROM (SELECT * FROM bufferTest ORDER BY msg_id DESC) AS Data LIMIT 20 OFFSET (?);`,
      // [offset]
      // `select * from bufferTest;`
      //
      // `
      //   SELECT BIN_TO_UUID(msg_id, 1) AS msg_id, content, type, time, image, created, updated, user, version FROM bufferTest WHERE time >= (SELECT time FROM bufferTest LIMIT 1 OFFSET (?)) LIMIT 20 offset (?);`,
      // [offset, mainOffset]
      `select count(*) from bufferTest;`
    ) //
    .then((result) => result[0]);
  // .then((result) => result[0]);
}

export async function getAllListResult(totalRow) {
  return db
    .execute(
      `SELECT BIN_TO_UUID(msg_id, 1) AS msg_id, content, type, image, created, updated, user, version FROM bufferTest limit 20 offset (?)`,
      [totalRow]
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
    `INSERT INTO bufferTest (content, type, time, image, user, version) VALUES (?,?,?,?,?,?)`,
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
