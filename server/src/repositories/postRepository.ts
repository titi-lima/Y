import { Post, Prisma} from '@prisma/client';
import prisma from '../database';

export class PostRepository{
    async create(data: Prisma.PostCreateInput): Promise<Post> {
      const post = await prisma.post.create({ data });
      return post;
    }
    async findCommentsByPostId(postId: string) {
      const post = await prisma.post.findUnique({
        where: { id: postId },
        select: {
          comments: true,
        },
      });
      return post?.comments;
    }
  }
  