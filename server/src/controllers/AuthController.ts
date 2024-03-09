import { NextFunction, Request, Response } from 'express';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { UserRepository } from '../repositories';

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const userRepository = new UserRepository();

      const user = await userRepository.findByNickName(username);

      if (!user) {
        return next({
          status: 400,
          message: 'Invalid Credentials',
        });
      }

      const checkPassword = await compare(password, user.password);

      if (!checkPassword) {
        return next({
          status: 400,
          message: 'Invalid Credentials',
        });
      }

      const accessToken = jwt.sign(
        { nickName: user.nickName },
        process.env.JWT_SECRET as string,
        {
          expiresIn: '1d',
        },
      );

      const { password: _, ...userWithoutPassword } = user;

      res.locals = {
        status: 200,
        message: 'User logged in',
        data: {
          accessToken,
          user: userWithoutPassword,
        },
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = jwt.sign(
        { nickName: null },
        process.env.JWT_SECRET as string,
        {
          expiresIn: '10',
        },
      );

      res.locals = {
        status: 200,
        message: 'User logged out',
        data: {
          accessToken,
        },
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new AuthController();
