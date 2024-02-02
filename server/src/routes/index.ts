import { Router } from 'express';
import userRouter from './UserRoutes';
import postRouter from './PostRoutes';

const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);

router.route('/').get((_, res) => {
  res.status(200).send('ok');
});

export default router;
