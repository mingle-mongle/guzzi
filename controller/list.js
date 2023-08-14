import * as listRepository from '../data/list.js';
import * as validate from '../schema/validate.js';
import { v4 as uuidv4 } from 'uuid';

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

export async function getListAllOrigin(req, res) {
  const data = await listRepository.getAllList();
  res.status(200).json(data);
}

export async function getAllList(req, res) {
  try {
    const page = validate.pageValid(Number(req.query.page));
    const limit = 20;
    const offset = (page - 1) * limit;
    const data = await listRepository.getAllList(offset);
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
