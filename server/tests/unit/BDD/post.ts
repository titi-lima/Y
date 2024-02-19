import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import { User } from '@prisma/client';
import { connection } from '../../Helper/database.config';
import * as step from '../../integration/BDD/shared_Steps';
import { prismaMock } from '../../../setupTests';

const feature = loadFeature('tests/unit/BDD/post_example.feature');

defineFeature(feature, (test) => {
  // interface shared_res {response?: supertest.Response};
  let cap: step.shared_res = {};
  let desired_user: User;

  beforeAll(async () => {
    await connection.create();
  });
  beforeEach(() => {
    cap = {};
  });
  afterEach(async () => {
    await connection.clear();
  });
  afterAll(async () => {
    await connection.close();
  });

  test.skip('Criar um post', ({ given, when, then }) => {
    given(/^há no sistema um usuário com '(.*)'$/, async (data) => {
      const user = JSON.parse(`{${data}}`);
      if (!('nickName' in user)) {
        user.nickName = step.test_user.nickName;
      }
      if (!('name' in user)) {
        user.name = step.test_user.name;
      }
      if (!('password' in user)) {
        user.password = step.test_user.password;
      }
      if (!('description' in user)) {
        user.description = step.test_user.description;
      }
      if (!('dateBirth' in user)) {
        user.dateBirth = step.test_user.dateBirth;
      } else {
        user.dateBirth = new Date(user.dateBirth);
      }
      desired_user = user;
    });
    when(
      /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com '(.*)'$/,
      async (url, data) => {
        const post = JSON.parse(`{${data}}`);

        prismaMock.user.findUnique.mockResolvedValue(desired_user);
        prismaMock.post.create.mockResolvedValue(post);

        cap.response = await step.request.post(url).send(post);
        console.log(cap.response.body);
      },
    );
    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(cap.response?.status).toBe(parseInt(statusCode, 10));
    });
    then(/^a resposta deve conter a mensagem "(.*)"$/, (message) => {
      expect(cap.response?.body.message).toEqual(message);
    });
  });

  test.skip('Falha ao criar post', ({ given, when, then }) => {
    step.givenUsrForaSist(given);
    when(
      /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com '(.*)'$/,
      async (url, data) => {
        const post = JSON.parse(`{${data}}`);

        prismaMock.user.findUnique.mockResolvedValue(null);
        prismaMock.post.create.mockResolvedValue(post);

        cap.response = await step.request.post(url).send(post);
        console.log(cap.response.body);
      },
    );
    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(cap.response?.status).toBe(parseInt(statusCode, 10));
    });
    then(/^a resposta deve conter a mensagem "(.*)"$/, (message) => {
      expect(cap.response?.body.message).toEqual(message);
    });
  });
});
