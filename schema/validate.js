import Ajv from 'ajv';
const ajv = new Ajv({ strict: false, useDefaults: true }); // options can be passed, e.g. {allErrors: true}

/**
 * 메세지아이디 스키마
 * @const {object}
 */
const msgIdSchema = {
  type: 'string',
  pattern:
    '^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$',
  additionalProperties: false,
};
/**
 * 페이지번호 스키마
 * @const {object}
 */
const pageSchema = {
  type: 'number',
  minimum: 1,
  additionalProperties: false,
};
/**
 * POST 요청시 body 스키마
 * @const {object}
 */
const createSchema = {
  type: 'object',
  properties: {
    content: { type: 'string' },
    type: { type: 'string' },
    image: { type: 'string', default: '' },
    user: { type: 'object' },
    version: { type: 'string' },
  },
  required: ['content', 'type', 'image', 'user', 'version'],
  additionalProperties: false,
};
/**
 * UPDATE 요청시 content 스키마
 * @const {object}
 */
const contentSchema = {
  type: 'string',
  additionalProperties: false,
};
/**
 * DB에서 받아온 데이터 스키마
 * @const {object}
 */
const dataSchema = {
  type: 'object',
  properties: {
    msg_id: { type: 'string' },
    content: { type: 'string' },
    type: { type: 'string' },
    image: { type: 'string' },
    created: { type: 'object' },
    updated: { type: 'object' },
    user: { type: 'object' },
    version: { type: 'string' },
  },
  required: ['msg_id', 'content'],
  additionalProperties: false,
};

/**
 * 메세지아이디 validation 검사
 * @param {string} msgId 메세지아이디
 * @returns {string} 유효성검사가 완료된 메세지아이디
 */
export function msgIdValid(msgId) {
  const validate = ajv.compile(msgIdSchema);
  const valid = validate(msgId);
  if (!valid) {
    throw new Error('MsgId Validate Error');
  }
  return msgId;
}
/**
 * 페이지 번호 validation 검사
 * @param {number} page 페이지번호
 * @returns {number} 유효성검사가 완료된 페이지번호
 */
export function pageValid(page) {
  const validate = ajv.compile(pageSchema);
  const valid = validate(page);
  if (!valid) {
    throw new Error('Page validate Error');
  }
  return page;
}
/**
 * POST 요청 시 body validation 검사
 * @param {object} data
 * @returns {object} 유효성검사가 완료된 data
 */
export function createValid(data) {
  const validate = ajv.compile(createSchema);
  const valid = validate(data);
  if (!valid) {
    throw new Error('Create Validate Error');
  }
  return data;
}
/**
 * UPDATE 요청 시 content validation 검사
 * @param {string} content
 * @returns {string} 유효성검사 완료된 content
 */
export function contentValid(content) {
  const validate = ajv.compile(contentSchema);
  const valid = validate(content);
  if (!valid) {
    throw new Error('Content Validate Error');
  }
  return content;
}
/**
 * DB에서 받아온 데이터 유효성 검사
 * @param {object} data
 * @returns {object} 유효성검사가 완료된 data
 */
export function dataValid(data) {
  const validate = ajv.compile(dataSchema);
  const valid = validate(data);
  if (!valid) {
    throw new Error('Data Validate Error');
  }
  return data;
}
