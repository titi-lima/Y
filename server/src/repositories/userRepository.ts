import { Post, Prisma, User } from '@prisma/client';
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

  // async addPostByUserId(userId: string, post_to_add: Post){
  //   const user = await prisma.user.findUnique({
  //     where: { id: userId },
  //     select: { posts: true }
  //   });
  //   var posts: Post[] = [post_to_add];
  //   if(user){
  //     posts = posts.concat(user.posts)
  //     await prisma.user.update({
  //       where: {user},
  //       data: { posts: posts}
  //     })
  //   }

  // }

  async findPostsByUserId(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        posts: true,
      },
    });
    return user?.posts;
  }

  // async findUserPostsByDate(userId: string, date: Date)
  
}