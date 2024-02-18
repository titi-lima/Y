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
  beforeEach(() => {
    cap = {};
  }); 
  afterEach(async () => {
    await connection.clear();
  });
  afterAll(async () => {
    await connection.close();
  });

  test('Buscar postagens de usuário em todas as datas', ({ given, when, then}) => {
    step.givenUsrNoSist(given);
    step.givenPostNoSist(given);
    step.givenPostNoSist(given);
    step.givenPostNoSist(given);
    step.whenGET(when, cap);
    step.thenStatus(then, cap);
    step.thenMsg(then, cap);
    step.thenListaDe(then, cap);
    step.thenItemNaLista(then, cap);
    step.thenItemNaLista(then, cap);
    step.thenItemNaLista(then, cap);

  });


  test('Buscar postagens de usuário em data específica', ({ given, when, then}) => {
    step.givenUsrNoSist(given);
    step.givenPostNoSist(given);
    step.givenPostNoSist(given);
    step.givenPostNoSist(given);
    step.whenGET(when, cap);
    step.thenStatus(then, cap);
    step.thenMsg(then, cap);
    step.thenListaDe(then, cap);
    step.thenItemNaLista(then, cap);
    step.thenItemNaLista(then, cap);
    step.thenItemForaLista(then, cap);

  });

  test('Buscar postagens de usuário em data inválida', ({ given, when, then}) => {
    step.givenUsrNoSist(given);
    step.whenGET(when, cap);
    step.thenStatus(then, cap);
    step.thenMsg(then, cap);

  });

});
