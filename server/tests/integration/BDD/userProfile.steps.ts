
import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import { connection } from '../../Helper/database.config';
import * as step from './shared_Steps';

const feature = loadFeature('../features/editUserProfile.feature');

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

  test('modificar nome de usuário com sucesso', ({ given, when, then}) => {
    step.givenUsrNoSist(given);
    step.changeUserName(when);
    step.pass(then)
    step.checkUserInformation(then)
  });

});
