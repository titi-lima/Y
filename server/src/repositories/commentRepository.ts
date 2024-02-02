import { Prisma, Comment } from '@prisma/client';
import prisma from '../database';

export class CommentRepository{
    async create(postId: string, authorId: string, date: Date, text: string): Promise<Comment> {
      const comment = await prisma.comment.create({
        data: {
          post:{
            connect: { id: postId }
          },
          author: {
            connect: { id: authorId }
          },
          date: date,
          text: text
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
  