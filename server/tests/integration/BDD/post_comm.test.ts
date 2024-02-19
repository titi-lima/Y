import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import { connection } from '../../Helper/database.config';
import * as step from './shared_Steps';

const feature = loadFeature('../features/post_comm.feature');

defineFeature(feature, (test) => {
  interface shared_res {
    response?: supertest.Response;
  }
  let cap: shared_res = {};

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

  test('Criar comentário', ({ given, when, then }) => {
    step.givenUsrNoSist(given);
    step.givenPostNoSist(given);
    step.whenPOSTcomJSON(when, cap);
    step.thenStatus(then, cap);
    step.thenMsg(then, cap);
    step.thenCommNoSist(then, cap);
  });

  test('Buscar comentários de postagem', ({ given, when, then }) => {
    step.givenPostNoSist(given);
    step.givenCommNoSist(given);
    step.givenCommNoSist(given);
    step.whenGET(when, cap);
    step.thenStatus(then, cap);
    step.thenMsg(then, cap);
    step.thenListaDe(then, cap);
    step.thenItemNaLista(then, cap);
    step.thenItemNaLista(then, cap);
  });

  test('Apagar comentário', ({ given, when, then }) => {
    step.givenCommNoSist(given);
    step.whenDELETE(when, cap);
    step.thenStatus(then, cap);
    step.thenMsg(then, cap);
    step.thenCommForaSist(then);
  });
});
