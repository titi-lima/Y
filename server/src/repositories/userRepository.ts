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

  async findFollowersByPorUserId(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        followersBy: true,
      },
    });
    return user?.followersBy;
  }

  async findFollowersPorUserId(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        followers: true,
      },
    });
    return user?.followers;
  }
}
