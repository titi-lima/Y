import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { UserRepository } from '../repositories';
import {
  User,
  validateDescription,
  validateName,
  validateNickName,
} from '../DTOs';

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
          status: 409,
          message: 'This NickName is already registered',
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

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const userRepository = new UserRepository();
      const user = await userRepository.findById(userId);

      if (!user) {
        return next({
          status: 404,
          message: 'User not found',
        });
      }

      const { password: _, ...userWithoutPassword } = user;

      res.locals = {
        status: 200,
        message: 'User found',
        data: userWithoutPassword,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getIdByNickName(req: Request, res: Response, next: NextFunction) {
    const { userNickName } = req.params;
    const userRepository = new UserRepository();

    const user = await userRepository.findByNickName(userNickName);
    if (user == null) {
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

  async insertFollows(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { followsId } = req.body;
      const userRepository = new UserRepository();

      if (userId === followsId) {
        return next({
          status: 400,
          message: 'This userId is the same as followsId',
        });
      }

      const user = await userRepository.findById(userId);
      if (user == null) {
        return next({
          status: 400,
          message: 'This userId is not registred',
        });
      }

      const newUser = await userRepository.findById(followsId);
      if (newUser == null) {
        return next({
          status: 400,
          message: 'This newFollowsId is not registred',
        });
      }

      const followsExist = await userRepository.findFollowsExistById(
        userId,
        followsId,
      );
      if (followsExist != null) {
        return next({
          status: 400,
          message: 'This newFollowsId is already registred in userId follows',
        });
      }

      await userRepository.insertFollows(userId, followsId);

      res.locals = {
        status: 200,
        message: 'User insert follows',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async removeFollows(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { removeFollowsId } = req.body;
      const userRepository = new UserRepository();

      if (userId === removeFollowsId) {
        return next({
          status: 400,
          message: 'This userId is the same as removeFollowsId',
        });
      }

      const user = await userRepository.findById(userId);
      if (user == null) {
        return next({
          status: 400,
          message: 'This userId is not registred',
        });
      }

      const newUser = await userRepository.findById(removeFollowsId);
      if (newUser == null) {
        return next({
          status: 400,
          message: 'This newFollowsId is not registred',
        });
      }

      const followsExist = await userRepository.findFollowsExistById(
        userId,
        removeFollowsId,
      );
      if (followsExist == null) {
        return next({
          status: 400,
          message: 'This removeFollowsId is not registred in userId Follows',
        });
      }

      await userRepository.removeFollows(userId, removeFollowsId);

      res.locals = {
        status: 200,
        message: 'remove follows',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async removeFollowers(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { removeFollowersId } = req.body;
      const userRepository = new UserRepository();

      if (userId === removeFollowersId) {
        return next({
          status: 400,
          message: 'This userId is the same as removeFolowerId',
        });
      }

      const user = await userRepository.findById(userId);
      if (user == null) {
        return next({
          status: 400,
          message: 'This userId is not registred',
        });
      }

      const newUser = await userRepository.findById(removeFollowersId);
      if (newUser == null) {
        return next({
          status: 400,
          message: 'This newFollowersId is not registred',
        });
      }

      const followersExist = await userRepository.findFollowersExistById(
        userId,
        removeFollowersId,
      );
      if (followersExist == null) {
        return next({
          status: 400,
          message:
            'This removeFollowersId is not registred in userId Followers',
        });
      }

      await userRepository.removeFollowers(userId, removeFollowersId);

      res.locals = {
        status: 200,
        message: 'remove Followers',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getFollows(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userRepository = new UserRepository();

      const user = await userRepository.findById(id);
      if (user == null) {
        return next({
          status: 400,
          message: 'This userId is not registred',
        });
      }

      const follows = await userRepository.findFollows(id);

      if (follows === undefined) {
        return next({
          status: 404,
          message: 'This id is not registred',
        });
      }

      res.locals = {
        status: 200,
        message: 'Follows found',
        data: follows,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getFollowers(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userRepository = new UserRepository();

      const user = await userRepository.findById(id);
      if (user == null) {
        return next({
          status: 400,
          message: 'This userId is not registred',
        });
      }

      const followers = await userRepository.findFollowers(id);

      if (followers === undefined) {
        return next({
          status: 404,
          message: 'This id is not registred',
        });
      }

      // if (followers.length == 0) {
      //   return next({
      //     status: 404,
      //     message: 'Followers not found',

      //   });
      // }

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

  async getFilterFollows(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, str } = req.params;
      const userRepository = new UserRepository();

      const user = userRepository.findById(id);
      if (!user) {
        return next({
          status: 400,
          message: 'This userId is not registred',
        });
      }

      let followsWithFilter;
      if (str === '@') {
        followsWithFilter = await userRepository.findFollowsPorFilter(id, '');
      } else {
        followsWithFilter = await userRepository.findFollowsPorFilter(id, str);
      }

      // if (!followsWithFilter) {
      //   return next({
      //     status: 404,
      //     message: "Follows with filter not found",
      //   })
      // }

      res.locals = {
        status: 200,
        message: 'Follows found',
        data: followsWithFilter,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getFilterFollowers(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, str } = req.params;
      const userRepository = new UserRepository();

      const user = userRepository.findById(id);
      if (!user) {
        return next({
          status: 400,
          message: 'This userId is not registred',
        });
      }

      let followersWithFilter;
      if (str === '@') {
        followersWithFilter = await userRepository.findFollowersPorFilter(
          id,
          '',
        );
      } else {
        followersWithFilter = await userRepository.findFollowersPorFilter(
          id,
          str,
        );
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

  async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userRepository = new UserRepository();

      const posts = await userRepository.findPostsByUserId(id);

      if (!posts) {
        return next({
          status: 400,
          message: 'User not found',
        });
      }

      if (!posts?.length) {
        return next({
          status: 204,
          message: 'User has no posts',
        });
      }

      res.locals = {
        status: 200,
        message: 'Posts found',
        data: posts,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getPostsByDate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, date_str } = req.params;
      const date = new Date(date_str);

      if (isNaN(date.getTime())) {
        return next({
          status: 400,
          message: 'Invalid date',
        });
      }

      const userRepository = new UserRepository();

      const posts = await userRepository.findPostsByUserId(id);

      if (!posts) {
        return next({
          status: 400,
          message: 'User not found',
        });
      }

      if (!posts?.length) {
        return next({
          status: 204,
          message: 'User has no posts',
        });
      }

      const desired_posts = posts.filter(
        (post) => post.date.getTime() === date.getTime(),
      );

      if (!desired_posts.length) {
        return next({
          status: 204,
          message: 'No posts found on this date',
          data: date,
        });
      }

      res.locals = {
        status: 200,
        message: 'Posts found',
        data: desired_posts,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async putNewDescription(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { description } = req.body;
      const validate_description = validateDescription.parse(description);
      const userRepository = new UserRepository();

      await userRepository.changeBioByUserID(userId, validate_description);

      res.status(200).send({
        sucess: true,
        message: 'Bio sucessfully updated ',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getDescriptionByUserId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { userId } = req.params;
      const userRepository = new UserRepository();
      const description = await userRepository.getDescriptionByUserID(userId);
      res.status(200).send({
        sucess: true,
        message: 'description: ',
        data: description,
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async changeUserName(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { name } = req.body;
      const validate_name = validateName.parse(name);
      const userRepository = new UserRepository();

      await userRepository.changeUserNameById(userId, validate_name);

      res.status(200).send({
        sucess: true,
        message: 'User name sucessfully updated',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getUserNameById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const userRepository = new UserRepository();
      const name = await userRepository.getUserNameById(userId);
      res.status(200).send({
        sucess: true,
        message: 'name: ',
        data: name,
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async changeNickName(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { nickName } = req.body;
      const validateNick = validateNickName.parse(nickName);
      const userRepository = new UserRepository();

      await userRepository.changeNickName(userId, validateNick);

      res.status(200).send({
        sucess: true,
        message: 'nickName sucessfully updated',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
