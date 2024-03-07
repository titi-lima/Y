import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import { connection } from '../../Helper/database.config';
import * as step from './shared_Steps';

const feature = loadFeature('../features/followerSystem.feature');

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

  test('Começar a seguir um usuário', ({ given, when, then}) => {
    step.givenUsrNoSist(given);
    step.givenUsrNoSist(given);
    step.whenPOSTcomJSON(when, cap);
    step.thenStatus(then, cap);
    step.thenMsg(then, cap);
  });

  test('Deixar de seguir um usuário', ({ given, when, then}) => {
    step.givenUsrNoSist(given);
    step.givenUsrNoSist(given);
    step.givenAddFollows(given);
    step.whenDELETEcomJSON(when, cap);
    step.thenStatus(then, cap);
    step.thenMsg(then, cap);
  });
});
