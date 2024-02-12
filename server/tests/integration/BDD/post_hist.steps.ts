import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import { connection } from '../../Helper/database.config';
import * as step from './shared_Steps';

const feature = loadFeature('../features/post_hist.feature');

defineFeature(feature, (test) => {
  interface shared_res {response?: supertest.Response};
  var cap: shared_res = {};
 
  beforeAll(async () => {
    await connection.create();
  }); 
  afterEach(async () => {
    await connection.clear();
  });
  afterAll(async () => {
    await connection.close();
  });

  test('Buscar postagens em data fornecida diretamente', ({ given, when, then}) => {
    step.givenUsrNoSist(given);
    step.givenPostNoSist(given);
    step.givenPostNoSist(given);
    step.whenGET(when, cap);
    step.thenStatus(then, cap);
    step.thenMsg(then, cap);
    step.thenListOf(then, cap);

  });

});
