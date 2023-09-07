import * as listRepository from '../data/list.js';
import * as validate from '../schema/validate.js';
import { v4 as uuidv4 } from 'uuid';

export async function getAllList(req, res) {
  try {
    // 기준 시점인 1582년 10월 15일의 타임스탬프 (100 나노초 단위)
    const gregorianStartTimestamp = BigInt('0x01B21DD213814000');

    // 현재 시간의 타임스탬프 (100 나노초 단위)
    const currentTimestamp = BigInt(new Date().getTime()) * BigInt(10000);

    // 기준 시점과 현재 타임스탬프의 합을 계산하여 시간 그레고리력 값을 얻음
    const timeGregorian = (gregorianStartTimestamp + currentTimestamp).toString(
      16
    );

    console.log(timeGregorian);

    const page = validate.pageValid(Number(req.query.page));
    const limit = 20;
    // const offset = (page - 1) * limit;
    const offset = page * limit;
    const mainOffset = (page - 1) * limit;

    const data = await listRepository.getAllList(offset, mainOffset);
    // const rows = data[0]['count(*)'];
    // const totalRow = rows - offset;
    // const result = await listRepository.getAllListResult(totalRow);
    // console.log(rows);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
}
export async function getAllListCount(req, res) {
  try {
    const page = validate.pageValid(Number(req.query.page));
    const limit = 20;
    // const offset = (page - 1) * limit;
    const offset = page * limit;
    // const mainOffset = (page - 1) * limit;

    const data = await listRepository.getListCount();
    const rows = data[0]['count(*)'];
    const totalRow = rows - offset;
    const result = await listRepository.getAllListResult(totalRow);
    console.log(rows);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
}

export async function getList(req, res) {
  try {
    const msgId = validate.msgIdValid(req.params.msgId);
    const data = await listRepository.getByMsgId(msgId);
    validate.dataValid(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
}

export async function createList(req, res) {
  try {
    const uuid = uuidv4();
    const time = new Date().getTime();
    const result = validate.createValid(req.body);
    result.user['uuid'] = uuid;
    await listRepository.createList(
      result.content,
      result.type,
      result.image,
      result.user,
      result.version,
      time
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(404).json({ error: error.toString() });
  }
}

export async function updateList(req, res) {
  try {
    const msgId = validate.msgIdValid(req.params.msgId);
    const content = validate.contentValid(req.body.content);
    await listRepository.updateList(msgId, content);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ error: error.toString() });
  }
}

export async function deleteList(req, res) {
  try {
    const msgId = validate.msgIdValid(req.params.msgId);
    await listRepository.deleteList(msgId);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ error: error.toString() });
  }
}
