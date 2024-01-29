import { Router } from 'express';

import userRouter from './UserRoutes';
import authRouter from './AuthRoutes';

const router = Router();

router.use('/users', userRouter);
router.use('/sessions', authRouter);

router.route('/').get((_, res) => {
  res.status(200).send('ok');
});

export default router;
