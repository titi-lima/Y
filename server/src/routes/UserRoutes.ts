import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.route('/').post(UserController.create);
userRouter.route('/:id/followers').get(UserController.getFollowers);

export default userRouter;
