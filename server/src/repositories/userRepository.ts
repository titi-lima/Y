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

  async removeFollower(userId: string, removeUserId: string) {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          followers: {
            disconnect: { id: removeUserId },
          },
        },
      });
      console.log(`Usuário ${userId} deixou de seguir ${removeUserId}.`);
    } catch (error) {
      console.error("Erro ao remover seguidor: ", error);
      throw error;
    }
  }

  async removeFollowerBy(userId: string, removeUserId: string) {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          followersBy: {
            disconnect: { id: removeUserId },
          },
        },
      });
      console.log(`Usuário ${removeUserId} deixou de seguir ${userId}.`);
    } catch (error) {
      console.error("Erro ao remover seguidor: ", error);
      throw error;
    }
  }
  
  async findFollowersByPorFilter(userId: string, str: string) {    
    try {
      const users = await prisma.user.findUnique({
        where: { 
          id: userId
        },
        select: {
          followersBy: {
            where: {
              nickName: {
                contains: str
              }
            },
            select: {
              nickName: true
            }
          }
        },
      });
      return users?.followersBy;
    } catch (error) {
      console.error("Erro na consulta: ", error);
      throw error;
    }
  }

  async findFollowersPorFilter(userId: string, str: string) {   
    try {
      const users = await prisma.user.findUnique({
        where: { 
          id: userId
        },
        select: {
          followers: {
            where: {
              nickName: {
                contains: str
              }
            },
            select: {
              nickName: true
            }
          }
        },
      });
      return users?.followers;
    } catch (error) {
      console.error("Erro na consulta: ", error);
      throw error;
    }
  }
}
