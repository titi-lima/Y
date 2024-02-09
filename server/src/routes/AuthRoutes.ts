import { Router } from 'express';

import { AuthController } from '../controllers';

const authRouter = Router();

authRouter.post('/', AuthController.login);
authRouter.delete('/', AuthController.logout);

export default authRouter;
