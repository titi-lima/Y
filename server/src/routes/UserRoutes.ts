import { Router } from 'express';
import { UserController } from '../controllers';

const userRouter = Router();

userRouter.route('/') 
  .post(
    UserController.create,
  );

export default userRouter;