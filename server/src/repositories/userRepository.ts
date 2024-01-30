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

  async findFollowersByUserId(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        followsBy: true,
        nickName: true,
      },
    });
    return user?.followsBy;
  }

  async findPostsByUserId(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        posts: true,
      },
    });
    return user?.posts;
  }
  
  async findLikedPostsByUserId(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        likedPosts: true
      },
    });
    return user?.likedPosts;
  }

  async findCommentsByUserId(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        comments: true,
      },
    });
    return user?.comments;
  }

}