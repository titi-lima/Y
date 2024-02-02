import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.route('/').post(UserController.create);
userRouter.route('/:id/followers').get(UserController.getFollowers);
userRouter.route('/:id/posts').get(UserController.getPosts);
userRouter.route('/:id/posts/:date_str').get(UserController.getPostsByDate);

export default userRouter;
