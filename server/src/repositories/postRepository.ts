import { Prisma, Post } from '@prisma/client';
import prisma from '../database';

export class PostRepository{
    async create(authorId: string, date: Date, text: string): Promise<Post>{
      const post = await prisma.post.create({
        data: {
          author: {
            connect: { id: authorId }
          },
          date: date,
          text: text
        }
      });
      return post;
    }

    async findByPostId(postId: string) {
      const post = await prisma.post.findUnique({
        where: { id: postId },
      });
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

    async addLike(postId: string, userId: string) {
      await prisma.post.update({
        where: { id: postId },
        data: { 
          likes: { increment: 1 },
          usrsWhoLkd: { connect: { id: userId } } 
        }
      });
    }

    async removeLike(postId: string, userId: string) {
      await prisma.post.update({
        where: { id: postId },
        data: { 
          likes: { decrement: 1 },
          usrsWhoLkd: { disconnect: { id: userId } } 
        }
      });
    }

    async findUsersWhoLikedByPostId(postId: string) {
      const post = await prisma.post.findUnique({
        where: { id: postId },
        select: {
          usrsWhoLkd: true
        },
      });
      return post?.usrsWhoLkd;
    }
    
    async delete(postId: string){
      await prisma.post.delete({
        where: { id: postId }
      })
    }

  }
  