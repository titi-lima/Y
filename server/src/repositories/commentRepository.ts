import { Prisma, Comment } from '@prisma/client';
import prisma from '../database';

export class CommentRepository{
    async create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
      const {postId: postId, authorId: authorId, ...rest} = data;
      const comment = await prisma.comment.create({
        data: {
          post:{
            connect: { id: postId }
          },
          author: {
            connect: { id: authorId }
          },
          ...rest
        }
      });
      return comment;
    }

    async delete(commentId: string){
      await prisma.comment.delete({
        where: { id: commentId }
      })
    }
    

  }
  