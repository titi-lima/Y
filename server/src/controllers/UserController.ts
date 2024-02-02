import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { UserRepository } from '../repositories';
import { User } from '../DTOs';
import { ReplOptions } from 'repl';

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

      const userWithHashedPassword = await hash(validatedData.password, 6);

      const user = await userRepository.create({
        ...validatedData,
        password: userWithHashedPassword,
      });

      const { password: _, ...userWithoutPassword } = user;

      res.locals = {
        status: 201,
        message: 'User created',
        data: userWithoutPassword,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getIdByNickName(req: Request, res: Response, next: NextFunction) {
    const { userNickName } = req.params
    const userRepository = new UserRepository()

    const user = await userRepository.findByNickName(userNickName);
    if(user == null) {
      return next({
        status: 400,
        message: 'This nickName is not registred',
      });
    }

    res.locals = {
      status: 200,
      message: 'User: ',
      data: user?.id,
    };

    return next();
  }

  async insertFollower(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      const { followerId } =  req.body
      const userRepository = new UserRepository()

      if (userId == followerId) {
        return next({
          status: 400,
          message: 'This userId is the same as folowerId',
        });
      }
      
      const user = await userRepository.findById(userId)
      if(user == null) {
        return next({
          status: 400,
          message: 'This userId is not registred',
        });
      }
      
      const newUser = await userRepository.findById(followerId)
      if(newUser == null) {
        return next({
          status: 400,
          message: 'This newFollowerId is not registred',
        });
      }
      
      const followerExist = await userRepository.findFollowerExistById(userId, followerId)
      if(followerExist != null) {
        return next({
          status: 400,
          message: 'This newFollowerId is already registred in userId followers',
        });
      }
      
      await userRepository.insertFollower(userId, followerId)

      res.locals = {
        status: 200,
        message: 'User insert follower',
      }

      return next()

    } catch (error) {
      return next(error)
    }
  }

  async removeFollower(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      const { removeFollowerId } =  req.body
      const userRepository = new UserRepository()

      if (userId == removeFollowerId) {
        return next({
          status: 400,
          message: 'This userId is the same as removeFolowerId',
        });
      }
      
      const user = await userRepository.findById(userId)
      if(user == null) {
        return next({
          status: 400,
          message: 'This userId is not registred',
        });
      }
      
      const newUser = await userRepository.findById(removeFollowerId)
      if(newUser == null) {
        return next({
          status: 400,
          message: 'This newFollowerId is not registred',
        });
      }

      const followerExist = await userRepository.findFollowerExistById(userId, removeFollowerId)
      if(followerExist == null) {
        return next({
          status: 400,
          message: 'This removeFollowerId is not registred in userId followers',
        });
      }
      
      await userRepository.removeFollower(userId, removeFollowerId)

      res.locals = {
        status: 200,
        message: 'remove follower',
      }

      return next()

    } catch (error) {
      return next(error)
    }
  }

  async removeFollowerBy(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      const { removeFollowerId } =  req.body
      const userRepository = new UserRepository()

      if (userId == removeFollowerId) {
        return next({
          status: 400,
          message: 'This userId is the same as removeFolowerId',
        });
      }
      
      const user = await userRepository.findById(userId)
      if(user == null) {
        return next({
          status: 400,
          message: 'This userId is not registred',
        });
      }
      
      const newUser = await userRepository.findById(removeFollowerId)
      if(newUser == null) {
        return next({
          status: 400,
          message: 'This newFollowerId is not registred',
        });
      }

      const followerExist = await userRepository.findFollowerByExistById(userId, removeFollowerId)
      if(followerExist == null) {
        return next({
          status: 400,
          message: 'This removeFollowerId is not registred in userId followersBy',
        });
      }
      
      await userRepository.removeFollowerBy(userId, removeFollowerId)

      res.locals = {
        status: 200,
        message: 'remove followerBy',
      }

      return next()

    } catch (error) {
      return next(error)
    }
  }
  
  async getFollowers(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userRepository = new UserRepository();

      const followers = await userRepository.findFollowers(id);

      if (followers == undefined){
        return next({
          status: 404,
          message: 'This id is not registred',
        });
      }

      res.locals = {
        status: 200,
        message: 'Followers found',
        data: followers,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getFollowersBy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userRepository = new UserRepository();

      const followersBy = await userRepository.findFollowersBy(id);

      if (followersBy == undefined){
        return next({
          status: 404,
          message: 'This id is not registred',
        });
      }

      // if (followersBy.length == 0) {
      //   return next({
      //     status: 404,
      //     message: 'Followers not found',

      //   });
      // }

      res.locals = {
        status: 200,
        message: 'Followers found',
        data: followersBy,
      }

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getFilterFollowers(req:Request, res: Response, next: NextFunction) {
    try {
      const { id, str } = req.params;
      const userRepository = new UserRepository();

      const user = userRepository.findById(id)
      if(!user) {
        return next({
          status: 400,
          message: 'This userId is not registred',
        });
      }

      let followersWithFilter
      if (str == "@") {
        followersWithFilter = await userRepository.findFollowersPorFilter(id, "")
      }
      else {
        followersWithFilter = await userRepository.findFollowersPorFilter(id, str)
      }

      // if (!followersWithFilter) {
      //   return next({
      //     status: 404,
      //     message: "Followers with filter not found",
      //   })
      // }

      res.locals = {
        status: 200,
        message: 'Followers found',
        data: followersWithFilter,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getFilterFollowersBy(req:Request, res: Response, next: NextFunction) {
    try {
      const { id, str } = req.params;
      const userRepository = new UserRepository();
      
      const user = userRepository.findById(id)
      if(!user) {
        return next({
          status: 400,
          message: 'This userId is not registred',
        });
      }

      let followersByWithFilter
      if (str == "@") {
        followersByWithFilter = await userRepository.findFollowersByPorFilter(id, "")
      }
      else {
        followersByWithFilter = await userRepository.findFollowersByPorFilter(id, str)
      }

      // if (!followersByWithFilter) {
      //   return next({
      //     status: 404,
      //     message: "FollowersBy with filter not found",
      //   })
      // }

      res.locals = {
        status: 200,
        message: 'FollowersBy found',
        data: followersByWithFilter,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
