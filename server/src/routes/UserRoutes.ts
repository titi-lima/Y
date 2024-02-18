import { User } from '@DTOs';
import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.route('/').post(UserController.create);
userRouter.route('/:userId/insertFollows').post(UserController.insertFollows)
userRouter.route('/:userId/removeFollows').post(UserController.removeFollows)
userRouter.route('/:userId/removeFollowers').post(UserController.removeFollowers)
userRouter.route('/:userNickName/getIdByNickName').get(UserController.getIdByNickName)
userRouter.route('/:id/follows').get(UserController.getFollows);
userRouter.route('/:id/followers').get(UserController.getFollowers);
userRouter.route('/:id/findFilterFollows/:str').get(UserController.getFilterFollows)
userRouter.route('/:id/findFilterFollowers/:str').get(UserController.getFilterFollowers)
userRouter.route('/:userId/changeDescription').put(UserController.putNewDescription)
userRouter.route('/:userId/getDescription').get(UserController.getDescriptionByUserId)
userRouter.route('/:userId/changeUserName').put(UserController.changeUserName)
userRouter.route('/:userId/getUserName').get(UserController.getUserNameById)
userRouter.route('/:userId/changeNickName').put(UserController.changeNickName)
userRouter.route('/:id/posts').get(UserController.getPosts);
userRouter.route('/:id/posts/:date_str').get(UserController.getPostsByDate);

export default userRouter;
