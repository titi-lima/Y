import { Request, Response, NextFunction } from 'express';
import { CommentRepository, PostRepository, UserRepository } from '../repositories';
import { Comment } from '../DTOs';

class CommentController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const commentData = req.body;
      const commentRepository = new CommentRepository();
      const postRepository = new PostRepository();
      const userRepository = new UserRepository();
      const validatedData = Comment.parse(commentData); // passe o mouse por cima de validatedData no VSCode e veja o tipo!

      const checkPost = await postRepository.findByPostId(
        validatedData.postId,
      );

      if (!checkPost) {
        return next({
          status: 400,
          message: 'Post not found',
        });
      }

      // const checkAuthor = await userRepository.findByNickName(
      //   validatedData.author,
      // );

      const checkAuthor = await userRepository.findById(
        validatedData.authorId,
      );

      if (!checkAuthor) {
        return next({
          status: 400,
          message: 'Author not found',
        });
      }

      const comment = await commentRepository.create(validatedData);

      res.locals = {
        status: 201,
        message: 'Comment created',
        data: comment,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const commentRepository = new CommentRepository();

      await commentRepository.delete(id)

      res.locals = {
        status: 200,
        message: 'Comment deleted',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

}

export default new CommentController();
