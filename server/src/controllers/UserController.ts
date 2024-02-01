import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories';
import { User } from '../DTOs';

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;
      const userRepository = new UserRepository();
      const validatedData = User.parse(userData); // passe o mouse por cima de validatedData no VSCode e veja o tipo!

      const checkNickName = await userRepository.findByNickName(
        validatedData.nickName,
      );

      if (checkNickName) {
        return next({
          status: 400,
          message: 'This NickName is already registred',
        });
      }

      const user = await userRepository.create(validatedData);

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


  async insertFollower(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      const { followerId } =  req.body
      const userRepository = new UserRepository
      const user = userRepository.findById(userId)
      if(user == null) {
        return next({
          status: 400,
          message: 'This userId is not registred',
        });
      }
      
      const newUser = userRepository.findById(followerId)
      if(newUser == null) {
        return next({
          status: 400,
          message: 'This newFollowerId is not registred',
        });
      }

      const followerExist = userRepository.findFollowerExistById(userId, followerId)
      if(followerExist != null) {
        return next({
          status: 400,
          message: 'This newFollowerId is already registred in userId followers',
        });
      }
      
      userRepository.insertFollower(userId, followerId)

      res.locals = {
        status: 201,
        message: 'User insert',
      }

    } catch (error) {
      return next(error)
    }
  }

  async insertFollowerBy(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      const { followerById } = req.body
      const userRepository = new UserRepository

      const user = userRepository.findById(userId)
      if(!user) {
        return next({
          status: 400,
          message: 'This userId is not registred',
        });
      }
      
      const newUser = userRepository.findById(followerById)
      if(!newUser) {
        return next({
          status: 400,
          message: 'This newUserId is not registred',
        });
      }

      const followerByExist = userRepository.findFollowerByExistById(userId, followerById)
      if(followerByExist != null) {
        return next({
          status: 400,
          message: 'This followerById is already registred in userId followers',
        });
      }
      
      userRepository.insertFollowerBy(userId, followerById)

      res.locals = {
        status: 201,
        message: 'User insert',
      }

    } catch (error) {
      return next(error)
    }
  }

  // async getFollowersBy(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const userRepository = new UserRepository();

  //     const followers = await userRepository.findFollowersBy(id);

  //     if (!followers) {
  //       return next({
  //         status: 404,
  //         message: 'Followers not found',
  //       });
  //     }

  //     res.locals = {
  //       status: 200,
  //       message: 'Followers found',
  //       data: followers,
  //     };

  //     return next();
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  // async getFollowers(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const userRepository = new UserRepository();

  //     const followers = await userRepository.findFollowers(id);

  //     if (!followers) {
  //       return next({
  //         status: 404,
  //         message: 'Followers not found',
  //       });
  //     }

  //     res.locals = {
  //       status: 200,
  //       message: 'Followers found',
  //       data: followers,
  //     };

  //     return next();
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  // async getFollowersPorFilter(req:Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id, str } = req.params;
  //     const userRepository = new UserRepository();

  //     const followers = await userRepository.findFollowers(id);

  //     if (!followers) {
  //       return next({
  //         status: 404,
  //         message: 'Followers not found',
  //       });
  //     }

  //     const followersWithFilter = await userRepository.findFollowersPorFilter(followers, str)

  //     if (!followersWithFilter) {
  //       return next({
  //         status: 404,
  //         message: "Followers with filter not found",
  //       })
  //     }

  //     res.locals = {
  //       status: 200,
  //       message: 'Followers found',
  //       data: followersWithFilter,
  //     };

  //     return next();
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  // async getFollowersByPorFilter(req:Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id, str } = req.params;
  //     const userRepository = new UserRepository();

  //     const followersBy = await userRepository.findFollowersBy(id);

  //     if (!followersBy) {
  //       return next({
  //         status: 404,
  //         message: 'Followers not found',
  //       });
  //     }

  //     const followersByWithFilter = await userRepository.findFollowersByPorFilter(followersBy, str)

  //     if (!followersByWithFilter) {
  //       return next({
  //         status: 404,
  //         message: "Followers with filter not found",
  //       })
  //     }

  //     res.locals = {
  //       status: 200,
  //       message: 'Followers found',
  //       data: followersByWithFilter,
  //     };

  //     return next();
  //   } catch (error) {
  //     return next(error);
  //   }
  // }
}

export default new UserController();
