import supertest from 'supertest';
import app from '../../../src/app';
import { UserRepository, PostRepository} from '../../../src/repositories';
import { DefineStepFunction } from 'jest-cucumber';
import { Post } from '@prisma/client';

const userRepository = new UserRepository
const postRepository = new PostRepository
const request = supertest(app);
interface shared_res {response?: supertest.Response};


// Modelos genéricos para teste

const test_user = {
  id: "u0",
  nickName: "TestNick",
  name: "Test Name",
  password: "123",
  description:"",
  dateBirth: new Date(),
};

const test_post ={
  id: "p0",
  authorId: "u0",
  date: new Date(),
  text: ".",
}


// GIVEN

export const givenUsrNoSist = (given: DefineStepFunction) => {
  given(
    /^há no sistema um usuário com '(.*)'$/,
    async (data) => {
      var user = JSON.parse("{" + data + "}");
      if(!("nickName" in user)) {user.nickName = test_user.nickName;}
      if(!("name" in user)) {user.name = test_user.name;}
      if(!("password" in user)) {user.password = test_user.password;}
      if(!("description" in user)) {user.description = test_user.description;}
      if(!("dateBirth" in user)) {
        user.dateBirth = test_user.dateBirth;
      }
      else{
        user.dateBirth = new Date(user.dateBirth);
      }
      user = await userRepository.create(user);
      console.log(user);
    }
  );
};

export const givenUsrForaSist = (given: DefineStepFunction) => {
  given(
    /^não há no sistema um usuário com id "(.*)"$/,
    async (user_id) => {
      const user = await userRepository.findByUserId(user_id);
      if(user){
        console.log("Usuário estava no sistema");
        // Adiciona função que deleta o usuário
      }
    }
  );
};

export const givenPostNoSist = (given: DefineStepFunction) => {
  given(
    /^há no sistema um post com '(.*)'$/,
    async (data) => {
      var post = JSON.parse("{" + data + "}");
      if(!("authorId" in post)) {
        await userRepository.create(test_user);
        post.authorId = test_post.id;
      }
      if(!("date" in post)) {
        post.date = test_post.date;
      }
      else{
        post.date = new Date(post.date);
      }
      if(!("text" in post)) {post.text = test_post.text;}
      post = await postRepository.create(post);
      console.log(post);
    }
  );
};


// WHEN

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


export const whenGET = (when: DefineStepFunction, cap: shared_res) => {
  when(
    /^uma requisição GET for enviada para "(.*)"$/,
    async (url) => {
      cap.response = await request.get(url);
      console.log(cap.response.body);
    }
  );
};


// THEN

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
    /^a resposta deve conter a mensagem "(.*)"$/,
    (message) => {
      expect(cap.response?.body.message).toEqual(message);
    }
  );
}

export const thenListOf = (then: DefineStepFunction, cap: shared_res) => {
  then(
    /^a resposta deve ser uma lista de "(.*)"$/,
    (list_type) => {
      if(list_type == "posts"){
        // let post_list: Post[]
        expect(cap.response?.body.data).toBeInstanceOf(Array<Post>);
      }
    }
  );
}
