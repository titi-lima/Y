import { Router } from 'express';

const router = Router();

router.route('/').get((_, res) => {
  res.status(200).send('ok');
});

export default router;
