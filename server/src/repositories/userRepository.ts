import { Prisma, User } from '@prisma/client';
import prisma from '../database';

export class UserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });
    return user;
  }

  async findByNickName(nickName: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { nickName } });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ 
      where: { id: id }
    });
    return user;
  }

  async findFollowers(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        followers: true,
      },
    });
    return user?.followers;
  }

  async findFollowersBy(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        followersBy: true,
      },
    });
    return user?.followersBy;
  }

  async findFollowerExistById(userId: string, newUserId: string): Promise<User | null> {
    const followers = await this.findFollowers(userId);
    if (followers) {
      const newUser = followers.find((seguidor: { id: string; }) => seguidor.id === newUserId);
      return newUser || null;
    } else {
      return null; // Usuário não encontrado
    }
  }
  
  async findFollowerByExistById(userId: string, newUserId: string): Promise<User | null> {
    const followersBy = await this.findFollowersBy(userId)
    if (followersBy) {
      const newUser = followersBy.find((seguidor: { id: string; }) => seguidor.id == newUserId);
      return newUser || null
    }
    else {
      return null
    }
  }

  async insertFollower(userId: string, newUserId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        followers: {
          connect: { id: newUserId },
        },
      },
    });
  }
  
  async insertFollowerBy(userId: string, newUserId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        followersBy: {
          connect: { id: newUserId },
        },
      },
    });
  }
  
  // async findFollowersByPorFilter(followersBy: string[], str: string): Promise<User | null> {    

  //   return null
  // }

  // async findFollowersPorFilter(followers: string[], str: string): Promise<User | null> {    

  //   return null
  // }
}
