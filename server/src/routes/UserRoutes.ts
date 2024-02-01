import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.route('/').post(UserController.create);
userRouter.route('/:userId/insertFollower').post(UserController.insertFollower)
userRouter.route('/:userId/insertFollowerBy').post(UserController.insertFollowerBy)
// userRouter.route('/:id/followers').get(UserController.getFollowers);
// userRouter.route('/:id/followersBy').get(UserController.getFollowersBy);

export default userRouter;
