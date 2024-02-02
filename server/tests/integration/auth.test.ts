import request from 'supertest';

import app from '../../src/app';
import { connection } from '../Helper/database.config';

describe('Auth Tests', () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterEach(async () => {
    await connection.clear();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should be able to authenticate a user', async () => {
    const user = {
      name: 'John Doe',
      nickName: 'john_doe',
      password: '123456',
      description: 'A cool guy',
      dateBirth: new Date(),
    };

    await request(app).post('/users').send(user);

    const response = await request(app).post('/sessions').send({
      nickName: user.nickName,
      password: user.password,
    });

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('accessToken');
  });
});
