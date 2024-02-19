import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import { connection } from '../../Helper/database.config';
import * as step from './shared_Steps';

const feature = loadFeature('../features/editUserProfile.feature');

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

  test('modificar nome de usuário com sucesso', ({ given, when, then }) => {
    step.givenUsrNoSist(given);
    step.changeUserName(when);
    step.thenUserInSystem(then);
  });
  test('modificar nickname sem sucesso', ({ given, when, then }) => {
    step.givenUsrNoSist(given);
    step.givenUsrNoSist(given);
    step.changeNickName(when);
    step.thenUserInSystem(then);
    step.thenUserInSystem(then);
  });
  test('modificar bio do usuário com sucesso', ({ given, when, then }) => {
    step.givenUsrNoSist(given);
    step.changeBio(when);
    step.thenUserInSystem(then);
  });
  test('modificar nickname com sucesso', ({ given, when, then }) => {
    step.givenUsrNoSist(given);
    step.givenUsrForaSist(given);
    step.changeNickName(when);
    step.thenUserInSystem(then);
  });
});
