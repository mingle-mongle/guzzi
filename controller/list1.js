import * as listRepository from '../data/list.js';
import { v4 as uuidv4 } from 'uuid';

export async function getList(req, res) {
  const msgId = req.params.msgId;
  const data = await listRepository.getByMsgId(msgId);
  res.status(200).json(data);
}

export async function getAllList(req, res) {
  const data = await listRepository.getAllList();
  res.status(200).json(data);
}

export async function createList(req, res) {
  const { content, type, image, user } = req.body;
  const time = new Date().getTime();
  const uuid = uuidv4();
  user['uuid'] = uuid;
  const list = await listRepository.createList(
    content,
    type,
    image,
    user,
    time
  );
  res.sendStatus(201);
}

export async function updateList(req, res) {
  const msgId = req.params.msgId;
  const content = req.body.content;
  const list = await listRepository.updateList(msgId, content);
  if (!list) {
    res.status(404).json({ message: `message id(${msgId}) not found` });
  }
  res.status(200).json(list);
}

export async function deleteList(req, res) {
  const msgId = req.params.msgId;
  await listRepository.deleteList(msgId);
  res.sendStatus(204);
}
