import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories';
import { User } from '../DTOs';

class UserController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
        const userData = req.body;

        const userRepository = new UserRepository();

        const validatedData = User.parse(userData); // passe o mouse por cima de validatedData no VSCode e veja o tipo!

        const checkNickName = await userRepository.findByNickName(validatedData.nickName);

        if (checkNickName) {
            return next({
            status: 400,
            message: 'This NickName is already registred',
            });
        }

        const user = await userRepository.create(userData);

        res.locals = {
            status: 201,
            message: 'User created',
            data: user,
        };

        return next();
        } catch (error) {
        return next(error);
        }
    }
}