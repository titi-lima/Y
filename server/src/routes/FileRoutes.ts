import { Router } from 'express';
import parser from '../config/multer';
import { FileController } from '../controllers';

const fileRouter = Router();

fileRouter
  .route('/upload')
  .post(parser.single('file'), FileController.uploadFile);

export default fileRouter;
