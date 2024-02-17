import { Prisma, User } from '@prisma/client';
import prisma from '../database';
import { error } from 'console';
import { HttpException } from 'src/middlewares';

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
      where: { id },
    });
    return user;
  }

  async findFollows(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        follows: {
          select: {
            id: true,
            nickName: true,
            name: true,
          },
        },
      },
    });
    return user?.follows;
  }

  async findFollowers(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        followers: {
          select: {
            id: true,
            nickName: true,
            name: true,
          },
        },
      },
    });
    return user?.followers;
  }

  async findFollowsExistById(userId: string, newUserId: string) {
    const follows = await this.findFollows(userId);
    if (follows) {
      const newUser = follows.find(
        (seguidor: { id: string }) => seguidor.id === newUserId,
      );
      return newUser || null;
    }
    return null; // Usuário não encontrado
  }

  async findFollowersExistById(userId: string, newUserId: string) {
    const followers = await this.findFollowers(userId);
    if (followers) {
      const newUser = followers.find(
        (seguidor: { id: string }) => seguidor.id === newUserId,
      );
      return newUser || null;
    }

    return null;
  }

  async insertFollows(userId: string, newUserId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        follows: {
          connect: { id: newUserId },
        },
      },
    });
  }

  async removeFollows(userId: string, removeUserId: string) {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          follows: {
            disconnect: { id: removeUserId },
          },
        },
      });
      console.log(`Usuário ${userId} deixou de seguir ${removeUserId}.`);
    } catch (error) {
      console.error('Erro ao remover seguidor: ', error);
      throw error;
    }
  }

  async removeFollowers(userId: string, removeUserId: string) {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          followers: {
            disconnect: { id: removeUserId },
          },
        },
      });
      console.log(`Usuário ${removeUserId} deixou de seguir ${userId}.`);
    } catch (error) {
      console.error('Erro ao remover seguidor: ', error);
      throw error;
    }
  }

  async findFollowersPorFilter(userId: string, str: string) {
    try {
      const users = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          followers: {
            where: {
              nickName: {
                contains: str,
              },
            },
            select: {
              nickName: true,
            },
          },
        },
      });
      return users?.followers;
    } catch (error) {
      console.error('Erro na consulta: ', error);
      throw error;
    }
  }

  async findFollowsPorFilter(userId: string, str: string) {
    try {
      const users = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          follows: {
            where: {
              nickName: {
                contains: str,
              },
            },
            select: {
              nickName: true,
            },
          },
        },
      });
      return users?.follows;
    } catch (error) {
      console.error('Erro na consulta: ', error);
      throw error;
    }
  }
  async changeBioByUserID(userId: string, newDescription: string){
    try{
      await prisma.user.update({
        where: { 
          id: userId
        },
        data: {
          description: newDescription
        },
      });
    }catch (error) {
      throw  error;
    }
  }
  async getDescriptionByUserID(userId: string){
    try{
      const description = await prisma.user.findUnique({
        where: { id: userId,},
        select: {description: true,},
      });
      return description;
    }catch (error) {
      throw error
    }
  }
  async changeUserNameById(userId: string, name: string){
    try{
      await prisma.user.update({
        where: { 
          id: userId
        },
        data: {
          name: name
        },
      });
    }catch (error) {
      throw  error;
    }
  }
  async getUserNameById(userId: string){
    try{
      const name = await prisma.user.findUnique({
        where: { id: userId,},
        select: {name: true,},
      });
      return name;
    }catch (error) {
      throw error
    }
  }
  async changeNickName(userId: string, nickName: string){
    try{
      await prisma.user.update({
        where: { 
          id: userId
        },
        data: {
          nickName: nickName
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError){
        //Unique constraint failed on the {nickName}
        //https://www.prisma.io/docs/orm/reference/error-reference
        if (error.code == "P2002"){
          // Conflict status (409)
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
          throw new HttpException(409,"There is a unique constraint violation, someone with that nickname aready exist");
        }
      }
    }
  }
}
