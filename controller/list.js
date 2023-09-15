import * as listRepository from '../data/list.js';
import * as redisRepository from './redis.js';
import * as validate from '../schema/validate.js';
import { v4 as uuidv4 } from 'uuid';

export async function getAllList(req, res) {
  try {
    const page = validate.pageValid(Number(req.query.page));
    const limit = 20;
    const offset = page * limit;
    const mainOffset = (page - 1) * limit;
    const data = await listRepository.getAllList(offset, mainOffset);
    res.status(200).json(data);
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

    const list = {
      content: result.content,
      type: result.type,
      image: result.image,
      user: result.user,
      version: result.version,
      time,
    };

    await redisRepository.createListToRedis(list);

    const affectedRow = await listRepository.createList(list);

    if (affectedRow === 0) {
      throw new Error('422');
    }

    res.sendStatus(201);
  } catch (error) {
    // console.log(error);
    // console.log(error.message);
    if (error.message === 'Create Validate Error') {
      return res.status(404).json({ error: error.toString() });
    } else if (error.message === '422') {
      return res.status(422).json({ error: error.toString() });
    }
    res.status(404).json({ error: error.toString() });
  }
}

export async function updateList(req, res) {
  try {
    const msgId = validate.msgIdValid(req.params.msgId);
    const content = validate.contentValid(req.body.content);
    const affectedRow = await listRepository.updateList(msgId, content);

    if (affectedRow === 0) {
      throw new Error('422');
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ error: error.toString() });
  }
}

export async function deleteList(req, res) {
  try {
    const msgId = validate.msgIdValid(req.params.msgId);
    const affectedRow = await listRepository.deleteList(msgId);

    if (affectedRow === 0) {
      throw new Error('422');
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ error: error.toString() });
  }
}
