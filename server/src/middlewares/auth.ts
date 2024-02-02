import { Request, NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { UserRepository } from '../repositories';

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return next({
        status: 401,
        message: 'Unauthorized',
      });
    }

    const [, token] = authToken.split(' ');

    if (!token) {
      return next({
        status: 401,
        message: 'Unauthorized',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded === 'string') {
      return next({
        status: 401,
        message: 'Unauthorized',
      });
    }

    const { nickName } = decoded;

    const userRepository = new UserRepository();

    const user = await userRepository.findByNickName(nickName);

    if (!user) {
      return next({
        status: 401,
        message: 'Unauthorized',
      });
    }

    return next();
  } catch (error) {
    return next(error);
  }
}
