import supertest from 'supertest';
import app from '../../../src/app';
import { UserRepository } from '../../../src/repositories';
import { DefineStepFunction } from 'jest-cucumber';

const userRepository = new UserRepository
const request = supertest(app);
interface shared_res {response?: supertest.Response};


export const givenUsrNoSist = (given: DefineStepFunction) => {
  given(
    /^o usuário de nickname "(.*)" está no sistema$/,
    async (user_nick) => {
      const user = await userRepository.findByNickName(user_nick);
      if(user){
        console.log("Usuário está no sistema");
      }
      else{
        const user = {
          nickName: user_nick,
          name: user_nick,
          password: "123",
          description: "",
          dateBirth: new Date()
        }
        const response = await request.post('/users').send(user);
        console.log(response.body);
      }
    }
  );
};

export const givenUsrForaSist = (given: DefineStepFunction) => {
  given(
    /^o usuário de nickname "(.*)" não está no sistema$/,
    async (user_nick) => {
      const user = await userRepository.findByNickName(user_nick);
      if(user){
        console.log("Usuário estava no sistema");
        // Adiciona função que deleta o usuário
      }
    }
  );
};


export const whenPOSTcomJSON = (when: DefineStepFunction, cap: shared_res) => {
  when(
    /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com '(.*)'$/,
    async (url, data) => {
      const post = JSON.parse("{" + data + "}");
      cap.response = await request.post(url).send(post);
      console.log(cap.response.body);
    }
  );
};

export const thenStatus = (then: DefineStepFunction, cap: shared_res) => {
  then(
    /^o status da resposta deve ser "(.*)"$/,
    (statusCode) => {
      expect(cap.response?.status).toBe(parseInt(statusCode, 10));
    }
  );
}

export const thenMsg = (then: DefineStepFunction, cap: shared_res) => {
  then(
    /^o JSON da resposta deve conter a mensagem "(.*)"$/,
    (message) => {
      expect(cap.response?.body.message).toEqual(message);
    }
  );
}