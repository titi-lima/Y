import { Router } from 'express';
import userRouter from './UserRoutes';

const router = Router();

router.use('/users', userRouter);

router.route('/').get((_, res) => {
  res.status(200).send('ok');
});

export default router;
