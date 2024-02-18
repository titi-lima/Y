import request from 'supertest';
import { defineFeature, loadFeature } from 'jest-cucumber';

import { connection } from '../Helper/database.config';
import app from '../../src/app';

const feature = loadFeature('./features/auth.feature');

defineFeature(feature, (test) => {
  const fakeUser = {
    name: 'John Doe',
    nickName: 'johndoe',
    password: '123456',
    description: 'A cool guy',
    dateBirth: new Date(),
  };

  let response: request.Response;

  beforeAll(async () => {
    await connection.create();
  });

  beforeEach(async () => {
    await connection.clear();
    await request(app).post('/users').send(fakeUser);
  });

  afterAll(async () => {
    await connection.close();
  });

  test('Autenticar um usuário', ({ given, when, then }) => {
    given(/^eu tenho um usuário com o nickname "(.*)"$/, async (nickname) => {
      response = await request(app).get(`/users/${nickname}/getIdByNickName`);

      response = await request(app).get(`/users/${response.body.data}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('nickName', nickname);
    });

    when(
      /^eu tento fazer login com o nickname "(.*)" e a senha "(.*)"$/,
      async (nickName, password) => {
        response = await request(app)
          .post('/sessions')
          .send({ nickName, password });
      },
    );

    then(
      /^eu devo receber um token de autenticação e um código de sucesso "(.*)"$/,
      async (statusCode) => {
        expect(response.status).toBe(Number(statusCode));
        expect(response.body.data).toHaveProperty('accessToken');
      },
    );
  });

  test('Autenticar um usuário com nickname inválido', ({
    given,
    when,
    then,
  }) => {
    given(/^eu tenho um usuário com o nickname "(.*)"$/, async (nickname) => {
      response = await request(app).get(`/users/${nickname}/getIdByNickName`);

      response = await request(app).get(`/users/${response.body.data}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('nickName', nickname);
    });

    when(
      /^eu tento fazer login com o nickname "(.*)" e a senha "(.*)"$/,
      async (nickName, password) => {
        response = await request(app)
          .post('/sessions')
          .send({ nickName, password });
      },
    );

    then(/^eu devo receber um código de erro "(.*)"$/, async (statusCode) => {
      expect(response.status).toBe(Number(statusCode));
    });
  });

  test('Autenticar um usuário com senha inválida', ({ given, when, then }) => {
    given(/^eu tenho um usuário com o nickname "(.*)"$/, async (nickname) => {
      response = await request(app).get(`/users/${nickname}/getIdByNickName`);

      response = await request(app).get(`/users/${response.body.data}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('nickName', nickname);
    });

    when(
      /^eu tento fazer login com o nickname "(.*)" e a senha "(.*)"$/,
      async (nickName, password) => {
        response = await request(app)
          .post('/sessions')
          .send({ nickName, password });
      },
    );

    then(/^eu devo receber um código de erro "(.*)"$/, async (statusCode) => {
      expect(response.status).toBe(Number(statusCode));
    });
  });
});
