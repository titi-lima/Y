import request from 'supertest';
import { defineFeature, loadFeature } from 'jest-cucumber';

import { connection } from '../Helper/database.config';
import app from '../../src/app';

const feature = loadFeature('./features/users.feature');

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
  });

  afterAll(async () => {
    await connection.close();
  });

  test('cadastrar usuário', ({ given, when, then }) => {
    given(
      /^eu não tenho um usuario com nickname "(.*)" cadastrado$/,
      async (nickname) => {
        response = await request(app).get(`/users/${nickname}/getIdByNickName`);

        response = await request(app).get(`/users/${response.body.data}`);

        expect(response.status).toBe(404);
      },
    );

    when(
      /^eu tento cadastrar um usuario com nickname "(.*)", nome "(.*)", descrição "(.*)", data de nascimento "(.*)" e senha "(.*)"$/,
      async (nickName, name, description, dateBirth, password) => {
        response = await request(app)
          .post('/users')
          .send({ nickName, password, name, description, dateBirth });
      },
    );

    then(
      /^o usuario com nickname "(.*)" é cadastrado e recebo um código de sucesso "(.*)"$/,
      async (nickname, statusCode) => {
        expect(response.status).toBe(Number(statusCode));
        expect(response.body.data).toHaveProperty('nickName', nickname);
      },
    );
  });

  test('cadastrar usuário com nickname já existente', ({
    given,
    when,
    then,
  }) => {
    given(
      /^eu tenho um usuario com nickname "(.*)" cadastrado$/,
      async (nickname) => {
        response = await request(app).post('/users').send(fakeUser);

        response = await request(app).get(
          `/users/${response.body.data.nickName}/getIdByNickName`,
        );

        response = await request(app).get(`/users/${response.body.data}`);

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('nickName', nickname);
      },
    );

    when(
      /^eu tento cadastrar um usuario com nickname "(.*)", nome "(.*)", descrição "(.*)", data de nascimento "(.*)" e senha "(.*)"$/,
      async (nickName, name, description, dateBirth, password) => {
        response = await request(app)
          .post('/users')
          .send({ nickName, password, name, description, dateBirth });
      },
    );

    then(/^eu devo receber um código de erro "(.*)"$/, async (statusCode) => {
      expect(response.status).toBe(Number(statusCode));
    });
  });
});
