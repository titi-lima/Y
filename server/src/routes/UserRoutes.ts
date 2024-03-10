import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.route('/').post(UserController.create);
userRouter.route('/:userNickName/getIdByNickName').get(UserController.getIdByNickName);
userRouter.route('/:userId').get(UserController.getById);
userRouter.route('/:userId/follows').get(UserController.getFollows);
userRouter.route('/:userId/followers').get(UserController.getFollowers);
userRouter.route('/:userId/filterFollows/:str').get(UserController.getFilterFollows);
userRouter.route('/:userId/filterFollowers/:str').get(UserController.getFilterFollowers);
userRouter.route('/:userId/follows').post(UserController.insertFollows);
userRouter.route('/:userId/follows').delete(UserController.removeFollows);
userRouter.route('/:userId/followers').delete(UserController.removeFollowers);
userRouter.route('/:userId/changeDescription').put(UserController.putNewDescription)
userRouter.route('/:userId/getDescription').get(UserController.getDescriptionByUserId)
userRouter.route('/:userId/changeUserName').put(UserController.changeUserName)
userRouter.route('/:userId/getUserName').get(UserController.getUserNameById)
userRouter.route('/:userId/changeNickName').put(UserController.changeNickName)
userRouter.route('/:id/posts').get(UserController.getPosts);
userRouter.route('/:id/posts/:date_str').get(UserController.getPostsByDate);

export default userRouter;
