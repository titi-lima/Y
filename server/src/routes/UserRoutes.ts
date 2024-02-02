import { User } from '@DTOs';
import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.route('/').post(UserController.create);
userRouter.route('/:userId/insertFollower').post(UserController.insertFollower)
userRouter.route('/:userId/removeFollower').post(UserController.removeFollower)
userRouter.route('/:userId/removeFollowerBy').post(UserController.removeFollowerBy)
userRouter.route('/:userNickName/getIdByNickName').get(UserController.getIdByNickName)
userRouter.route('/:id/followers').get(UserController.getFollowers);
userRouter.route('/:id/followersBy').get(UserController.getFollowersBy);
userRouter.route('/:id/findFilterFollowers/:str').get(UserController.getFilterFollowers)
userRouter.route('/:id/findFilterFollowersBy/:str').get(UserController.getFilterFollowersBy)

export default userRouter;
