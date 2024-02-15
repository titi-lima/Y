import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.route('/').post(UserController.create);
userRouter.route('/:userId/insertFollows').post(UserController.insertFollows);
userRouter.route('/:userId/removeFollows').post(UserController.removeFollows);
userRouter.route('/:userId').get(UserController.getById);
userRouter
  .route('/:userId/removeFollowers')
  .post(UserController.removeFollowers);
userRouter
  .route('/:userNickName/getIdByNickName')
  .get(UserController.getIdByNickName);

userRouter.route('/:id/follows').get(UserController.getFollows);
userRouter.route('/:id/followers').get(UserController.getFollowers);
userRouter
  .route('/:id/findFilterFollows/:str')
  .get(UserController.getFilterFollows);
userRouter
  .route('/:id/findFilterFollowers/:str')
  .get(UserController.getFilterFollowers);

export default userRouter;
