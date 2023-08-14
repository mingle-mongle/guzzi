import Ajv from 'ajv';
const ajv = new Ajv({ strict: false, useDefaults: true }); // options can be passed, e.g. {allErrors: true}

const msgIdSchema = {
  type: 'string',
  pattern:
    '^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$',
  additionalProperties: false,
};
const pageSchema = {
  type: 'number',
  minimum: 1,
  additionalProperties: false,
};

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

const contentSchema = {
  type: 'string',
  additionalProperties: false,
};

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

export function msgIdValid(msgId) {
  const validate = ajv.compile(msgIdSchema);
  const valid = validate(msgId);
  if (!valid) {
    throw new Error('MsgId Validate Error');
  }
  return msgId;
}

export function pageValid(page) {
  const validate = ajv.compile(pageSchema);
  const valid = validate(page);
  if (!valid) {
    throw new Error('Page validate Error');
  }
  return page;
}

export function createValid(data) {
  const validate = ajv.compile(createSchema);
  const valid = validate(data);
  if (!valid) {
    throw new Error('Create Validate Error');
  }
  return data;
}

export function contentValid(content) {
  const validate = ajv.compile(contentSchema);
  const valid = validate(content);
  if (!valid) {
    throw new Error('Content Validate Error');
  }
  return content;
}

export function dataValid(data) {
  const validate = ajv.compile(dataSchema);
  const valid = validate(data);
  if (!valid) {
    throw new Error('Data Validate Error');
  }
  return data;
}
