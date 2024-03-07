/* eslint-disable no-param-reassign */
import supertest from 'supertest';
import { DefineStepFunction } from 'jest-cucumber';
import { Comment, Post } from '@prisma/client';
import app from '../../../src/app';
import {
  UserRepository,
  PostRepository,
  CommentRepository,
} from '../../../src/repositories';

export const userRepository = new UserRepository();
export const postRepository = new PostRepository();
export const commentRepository = new CommentRepository();
export const request = supertest(app);
export interface shared_res {
  response?: supertest.Response;
}

// Modelos genéricos para teste

export const test_user = {
  id: 'u0',
  nickName: 'TestNick',
  name: 'Test Name',
  password: '123',
  description: '',
  dateBirth: new Date(),
};

export const test_post = {
  id: 'p0',
  authorId: 'u0',
  date: new Date(),
  text: '.',
};

export const test_comment = {
  id: 'c0',
  postId: 'p0',
  authorId: 'u0',
  date: new Date(),
  text: '.',
};

// GIVEN

export const givenUsrNoSist = (given: DefineStepFunction) => {
  given(
    /^(há no sistema um usuário com|o usuário com) '{?([^{}}]*)}?'( está cadastrado no sistema)?$/,
    async (pass1, data) => {
      let user = JSON.parse(`{${data}}`);
      if (!('nickName' in user)) {
        user.nickName = test_user.nickName;
      }
      if (!('name' in user)) {
        user.name = test_user.name;
      }
      if (!('password' in user)) {
        user.password = test_user.password;
      }
      if (!('description' in user)) {
        user.description = test_user.description;
      }
      if (!('dateBirth' in user)) {
        user.dateBirth = test_user.dateBirth;
      } else {
        user.dateBirth = new Date(user.dateBirth);
      }
      user = await userRepository.create(user);
      console.log(user);
    },
  );
};

export const givenAddFollows = (given: DefineStepFunction) => {
  given(
    /^o usuário com id '(.*)' segue o usuário '(.*)'$/,
    async (userId: string, newUserId: string) => {
      await userRepository.insertFollows(userId, newUserId);
    },
  );
};

export const givenUsrForaSist = (given: DefineStepFunction) => {
  given(
    /^(o usuário com|não há no sistema um usuário com id) ["'](.*)["']( não está cadastrado no sistema)?$/,
    async (str1, user_id) => {
      let user;
      if (str1 === 'o usuário com') {
        const user_info = JSON.parse(user_id);
        if ('id' in user_info) {
          user = await userRepository.findById(user_info.id);
        } else if ('nickName' in user_info) {
          user = await userRepository.findByNickName(user_info.nickName);
        }
      } else {
        user = await userRepository.findById(user_id);
      }
      if (user) {
        console.log('Usuário estava no sistema');
        // Adiciona função que deleta o usuário
      } else {
        console.log(`Usuário ${user_id} não está no sistema`);
      }
    },
  );
};

export const givenPostNoSist = (given: DefineStepFunction) => {
  given(/^há no sistema um post com '(.*)'$/, async (data) => {
    let post = JSON.parse(`{${data}}`);
    if (!('authorId' in post)) {
      await userRepository.create(test_user);
      post.authorId = test_user.id;
    }
    if (!('date' in post)) {
      post.date = test_post.date;
    } else {
      post.date = new Date(post.date);
    }
    if (!('text' in post)) {
      post.text = test_post.text;
    }
    post = await postRepository.create(post);
    console.log(post);
  });
};

export const givenCommNoSist = (given: DefineStepFunction) => {
  given(/^há no sistema um comentário com '(.*)'$/, async (data) => {
    let comment = JSON.parse(`{${data}}`);
    if (!('postId' in comment)) {
      const user = await userRepository.findById(test_user.id);
      if (!user) {
        await userRepository.create(test_user);
      }
      const post = await postRepository.findByPostId(test_post.id);
      if (!post) {
        await postRepository.create(test_post);
      }
      comment.postId = test_post.id;
    }
    if (!('authorId' in comment)) {
      const user = await userRepository.findById(test_user.id);
      if (!user) {
        await userRepository.create(test_user);
      }
      comment.authorId = test_user.id;
    }
    if (!('date' in comment)) {
      comment.date = test_comment.date;
    } else {
      comment.date = new Date(comment.date);
    }
    if (!('text' in comment)) {
      comment.text = test_comment.text;
    }
    comment = await commentRepository.create(comment);
    console.log(comment);
  });
};

// WHEN

export const whenPOSTcomJSON = (when: DefineStepFunction, cap: shared_res) => {
  when(
    /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com '(.*)'$/,
    async (url, data) => {
      const post = JSON.parse(`{${data}}`);
      cap.response = await request.post(url).send(post);
      console.log(cap.response.body);
    },
  );
};

export const whenDELETEcomJSON = (when: DefineStepFunction, cap: shared_res) => {
  when(
    /^uma requisição DELETE for enviada para "(.*)" com o corpo da requisição sendo um JSON com '(.*)'$/,
    async (url, data) => {
      const post = JSON.parse(`{${data}}`);
      cap.response = await request.delete(url).send(post);
      console.log(cap.response.body);
    },
  );
};

export const whenGET = (when: DefineStepFunction, cap: shared_res) => {
  when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
    cap.response = await request.get(url);
    console.log(cap.response.body);
  });
};

export const whenDELETE = (when: DefineStepFunction, cap: shared_res) => {
  when(/^uma requisição DELETE for enviada para "(.*)"$/, async (url) => {
    cap.response = await request.delete(url);
    console.log(cap.response.body);
  });
};

export const changeUserName = (when: DefineStepFunction) => {
  when(
    /^o usuário com '{nickName: "(.*)"}' modifica seu nome para '(.*)'$/,
    async (nickname, name) => {
      const user = await userRepository.findByNickName(nickname);
      if (user != null) {
        await userRepository.changeUserNameById(user.id, name);
        console.log('user name changed');
      } else {
        console.log("system can't change name from user that doesnt exist");
      }
    },
  );
};

export const changeNickName = (when: DefineStepFunction) => {
  when(
    /^o usuário com '{nickName: "(.*)"}' modifica seu nickname para '(.*)'$/,
    async (nickname, name) => {
      const user = await userRepository.findByNickName(nickname);
      if (user != null) {
        try {
          await userRepository.changeNickName(user.id, name);
          console.log('user nickname changed');
        } catch (e) {
          console.log(e);
        }
      } else {
        console.log("system can't change nickname from user that doesnt exist");
      }
    },
  );
};

export const changeBio = (when: DefineStepFunction) => {
  when(
    /^o usuário com '{nickName: "(.*)"}' modifica sua descrição para '(.*)'$/,
    async (nickname, description) => {
      const user = await userRepository.findByNickName(nickname);
      if (user != null) {
        await userRepository.changeBioByUserID(user.id, description);
        console.log('user bio changed');
      } else {
        console.log("system can't change bio from user that doesnt exist");
      }
    },
  );
};
// THEN

export const thenStatus = (then: DefineStepFunction, cap: shared_res) => {
  then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
    expect(cap.response?.status).toBe(parseInt(statusCode, 10));
  });
};

export const thenMsg = (then: DefineStepFunction, cap: shared_res) => {
  then(/^a resposta deve conter a mensagem "(.*)"$/, (message) => {
    expect(cap.response?.body.message).toEqual(message);
  });
};

export const thenListaDe = (then: DefineStepFunction, cap: shared_res) => {
  then(/^a resposta deve ser uma lista de "(.*)"$/, (list_type) => {
    if (list_type === 'posts') {
      expect(cap.response?.body.data).toBeInstanceOf(Array<Post>);
    } else if (list_type === 'comments') {
      expect(cap.response?.body.data).toBeInstanceOf(Array<Comment>);
    }
  });
};

export const thenArrayDeUsers = (then: DefineStepFunction, cap: shared_res) => {
  then(/^a requisição deve retornar um array '(.*)'$/, (arrayUsers) => {
    const jsonArrayUsers = JSON.parse(arrayUsers);
    expect(cap.response?.body.data).toStrictEqual(jsonArrayUsers);
  });
};

export const thenItemNaLista = (then: DefineStepFunction, cap: shared_res) => {
  then(/^um item com '(.*)' está na lista$/, (data) => {
    const match = JSON.parse(`{${data}}`);
    expect(cap.response?.body.data).toContainEqual(
      expect.objectContaining(match),
    );
  });
};

export const thenItemForaLista = (
  then: DefineStepFunction,
  cap: shared_res,
) => {
  then(/^um item com '(.*)' não está na lista$/, (data) => {
    const match = JSON.parse(`{${data}}`);
    expect(cap.response?.body.data).not.toContainEqual(
      expect.objectContaining(match),
    );
  });
};

export const thenCommNoSist = (then: DefineStepFunction, cap: shared_res) => {
  then(/^há no sistema um comentário criado com '(.*)'$/, async (data) => {
    const match = JSON.parse(`{${data}}`);
    if (match.date) {
      match.date = new Date(match.date);
    }
    const comment = await commentRepository.findByCommentId(
      cap.response?.body.data.id,
    );
    console.log(comment);
    expect(comment).toMatchObject(match);
  });
};

export const thenCommForaSist = (then: DefineStepFunction) => {
  then(
    /^não há mais no sistema um comentário com id "(.*)"$/,
    async (commentId) => {
      const comment = await commentRepository.findByCommentId(commentId);
      expect(comment).toBeNull();
    },
  );
};

export const pass = (then: DefineStepFunction) => {
  then(/^.*$/, () => {});
};

export const thenUserInSystem = (then: DefineStepFunction) => {
  then(
    /^o usuário (com )?'(.*)' está cadastrado no sistema$/,
    async (com, user_data) => {
      const new_test_user = JSON.parse(user_data);
      let user = JSON.parse('{}');
      try {
        if ('nickName' in new_test_user) {
          user = await userRepository.findByNickName(new_test_user.nickName);
        } else if ('id' in new_test_user) {
          user = await userRepository.findById(new_test_user.id);
        }
        if ('name' in new_test_user) {
          if (user.name !== new_test_user.name) {
            throw new Error('users name are differents');
          }
        }
        if ('password' in new_test_user) {
          if (user.password !== new_test_user.password) {
            throw new Error('users password are differents');
          }
        }
        if ('description' in new_test_user) {
          if (user.description !== new_test_user.description) {
            throw new Error('users description are differents');
          }
        }
        if ('dateBirth' in new_test_user) {
          if (user.dateBirth !== new_test_user.dateBirth) {
            throw new Error('users dateBirth are differents');
          }
        }
        console.log(user);
        console.log(new_test_user);
        expect(true).toEqual(true);
      } catch (error) {
        expect(true).toEqual(false);
        console.log(error);
      }
    },
  );
};
