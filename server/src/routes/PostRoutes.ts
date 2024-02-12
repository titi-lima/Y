import { Router } from 'express';
import { PostController } from '../controllers';

const postRouter = Router();

postRouter.route('/').post(PostController.create);
postRouter.route('/:id/comments').get(PostController.getComments);
postRouter.route('/:id/addLike/:userId').patch(PostController.addLike);
postRouter.route('/:id/rmvLike/:userId').patch(PostController.removeLike);
postRouter.route('/:id/whoLiked').get(PostController.getUsersWhoLiked);
postRouter.route('/:id').delete(PostController.delete);

export default postRouter;
