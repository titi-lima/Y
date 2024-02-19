import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import { connection } from '../../Helper/database.config';
import * as step from './shared_Steps';

const feature = loadFeature('../features/listFollower.feature');

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

  test('Lista de seguindo', ({ given, when, then}) => {
    step.givenUsrNoSist(given);
    step.givenUsrNoSist(given);
    step.givenUsrNoSist(given);
    step.givenAddFollows(given);
    step.givenAddFollows(given);
    step.whenGET(when, cap);
    step.thenStatus(then, cap);
    step.thenArrayDeUsers(then, cap);
  });

  test('Lista de seguidores', ({ given, when, then}) => {
    step.givenUsrNoSist(given);
    step.givenUsrNoSist(given);
    step.givenUsrNoSist(given);
    step.givenAddFollows(given);
    step.givenAddFollows(given);
    step.whenGET(when, cap);
    step.thenStatus(then, cap);
    step.thenArrayDeUsers(then, cap);
  });

  test('Buscar na lista de seguindo', ({ given, when, then}) => {
    step.givenUsrNoSist(given);
    step.givenUsrNoSist(given);
    step.givenUsrNoSist(given);
    step.givenAddFollows(given);
    step.givenAddFollows(given);
    step.whenGET(when, cap);
    step.thenStatus(then, cap);
    step.thenArrayDeUsers(then, cap);
  });

  test('Buscar na lista de seguidores', ({ given, when, then}) => {
    step.givenUsrNoSist(given);
    step.givenUsrNoSist(given);
    step.givenUsrNoSist(given);
    step.givenAddFollows(given);
    step.givenAddFollows(given);
    step.whenGET(when, cap);
    step.thenStatus(then, cap);
    step.thenArrayDeUsers(then, cap);
  });
});
