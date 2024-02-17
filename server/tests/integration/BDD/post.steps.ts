import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import { connection } from '../../Helper/database.config';
import * as step from './shared_Steps';

const feature = loadFeature('tests/integration/BDD/post_example.feature');

defineFeature(feature, (test) => {
  interface shared_res {response?: supertest.Response};
  var cap: shared_res = {};

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

  test('Criar um post', ({ given, when, then}) => {
    step.givenUsrNoSist(given);
    step.whenPOSTcomJSON(when, cap);
    step.thenStatus(then, cap);
    step.thenMsg(then, cap);

  });

  test('Falha ao criar post', ({ given, when, then}) => {
    step.givenUsrForaSist(given);
    step.whenPOSTcomJSON(when, cap);
    step.thenStatus(then, cap);
    step.thenMsg(then, cap);

  });

});
