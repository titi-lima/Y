import { Router } from 'express';
import auth from '../middlewares/auth';
import parser from '../config/multer';
import { FileController } from '../controllers';

const fileRouter = Router();

fileRouter
  .route('/upload')
  .post(parser.single('file'), [auth], FileController.uploadFile);

export default fileRouter;
