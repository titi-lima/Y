import { Comment, Prisma} from '@prisma/client';
import prisma from '../database';

export class CommentRepository{
    async create(data: Prisma.CommentCreateInput): Promise<Comment> {
      const comment = await prisma.comment.create({ data });
      return comment;
    }
  }
  