import { Router } from 'express';

import auth from '../middlewares/auth';
import { AuthController } from '../controllers';

const authRouter = Router();

authRouter.route('/').post(AuthController.login);
authRouter.route('/').delete([auth], AuthController.logout);

export default authRouter;
