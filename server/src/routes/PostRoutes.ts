import { Router } from 'express';
import PostController from 'src/controllers/PostController';

const postRouter = Router();

postRouter.route('/').post(PostController.create);
postRouter.route('/:id/addLike/:user').patch(PostController.addLike);
postRouter.route('/:id/rmvLike/:user').patch(PostController.removeLike);

export default postRouter;
