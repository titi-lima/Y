import { Router } from 'express';
import { CommentController } from '../controllers';

const commentRouter = Router();

commentRouter.route('/').post(CommentController.create);
commentRouter.route('/:id').delete(CommentController.delete);

export default commentRouter;
