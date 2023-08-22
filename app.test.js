// const request = require("supertest");
import request from 'supertest';

import { app } from './app';

describe('GET /getAllList', () => {
  it('`current time - last message time` should be within 24 hours', async () => {
    await request(app)
      .post('/lists')
      .send({
        content: '테스트 중 입니다',
        type: 'message',
        image: 'test image',
        user: { role: 'user', ip: '127.0.0.1', device_id: 'device3' },
        version: 'v3',
      })
      .expect(201);
    const res = await request(app).get('/lists?page=1');

    const latestMessageCreatedAt = res.body[0].created;
    const currentTime = new Date().toISOString();
    const hourDiff =
      Math.abs(new Date(currentTime) - new Date(latestMessageCreatedAt)) /
      (1000 * 60 * 60);

    expect(hourDiff).toBeLessThanOrEqual(24);
  });
});
