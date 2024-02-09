import { Router } from 'express';

import userRouter from './UserRoutes';
import authRouter from './AuthRoutes';
import postRouter from './PostRoutes';
import commentRouter from './CommentRoutes';

const router = Router();

router.use('/users', userRouter);
router.use('/sessions', authRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter)

router.route('/').get((_, res) => {
  res.status(200).send('ok');
});

export default router;
