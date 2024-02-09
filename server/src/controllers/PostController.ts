import { Request, Response, NextFunction } from 'express';
import { PostRepository, UserRepository } from '../repositories';
import { Post } from '../DTOs';

class PostController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const postData = req.body;
      const postRepository = new PostRepository();
      const userRepository = new UserRepository();
      const validatedData = Post.parse(postData); // passe o mouse por cima de validatedData no VSCode e veja o tipo!

      const checkAuthor = await userRepository.findByNickName(
        validatedData.author,
      );

      if (!checkAuthor) {
        return next({
          status: 400,
          message: 'Author not found',
        });
      };

      const post = await postRepository.create(checkAuthor.id, validatedData.date, validatedData.text);

      res.locals = {
        status: 201,
        message: 'Post created',
        data: post,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getComments(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const postRepository = new PostRepository();

      const comments = await postRepository.findCommentsByPostId(id);

      if (!comments?.length) {
        return next({
          status: 204,
          message: 'Post has no comments',
        });
      };

      res.locals = {
        status: 200,
        message: 'Comments found',
        data: comments,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
  
  async addLike(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, user } = req.params;
      const postRepository = new PostRepository();
      const userRepository = new UserRepository();

      const post = await postRepository.findByPostId(id);

      if (!post) {
        return next({
          status: 400,
          message: 'Post not found',
        });
      };

      const checkUser = await userRepository.findByNickName(user);  

      if (!checkUser) {
        return next({
          status: 400,
          message: 'User not found',
        });
      };

      const usrsWhoLkd = await postRepository.findUsersWhoLikedByPostId(id);
      if(usrsWhoLkd){
        for(var usr of usrsWhoLkd){
          if(usr.id === checkUser.id){
            return next({
              status: 403,
              message: 'User has already liked the post',
            });
          }
        }
      }

      await postRepository.addLike(id, checkUser.id);

      res.locals = {
        status: 200,
        message: 'Like added',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
  
  async removeLike(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, user } = req.params;
      const postRepository = new PostRepository();
      const userRepository = new UserRepository();

      const post = await postRepository.findByPostId(id);

      if (!post) {
        return next({
          status: 400,
          message: 'Post not found',
        });
      };

      const checkUser = await userRepository.findByNickName(user);  

      if (!checkUser) {
        return next({
          status: 400,
          message: 'User not found',
        });
      };

      const usrsWhoLkd = await postRepository.findUsersWhoLikedByPostId(id);
      var found = false
      if(usrsWhoLkd){
        for(var usr of usrsWhoLkd){
          if(usr.id === checkUser.id){
            found = true
          }
        }
      }
      if(!found){
        return next({
          status: 403,
          message: 'User has not liked the post',
        });
      }
      
      await postRepository.removeLike(id, checkUser.id);
      res.locals = {
        status: 200,
        message: 'Like removed'
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getUsersWhoLiked(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const postRepository = new PostRepository();

      const users = await postRepository.findUsersWhoLikedByPostId(id);

      if (!users) {
        return next({
          status: 204,
          message: 'No one has liked the post yet',
        });
      }

      res.locals = {
        status: 200,
        message: 'Users found',
        data: users,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }  

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const postRepository = new PostRepository();

      await postRepository.delete(id)

      res.locals = {
        status: 200,
        message: 'Post deleted',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }


}

export default new PostController();
