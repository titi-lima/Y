import { Request, Response, NextFunction } from 'express';

class FileController {
  async uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
      const path = req.file?.path;
      if (!path) {
        return next({
          status: 400,
          message: 'File not uploaded',
        });
      }
      res.locals = {
        status: 201,
        message: 'File uploaded!',
        data: { url: path },
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new FileController();
