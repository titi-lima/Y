import { z } from 'zod';
export const validateDescription = z.string().max(300)
export const validateName = z.string().min(1)
export const validateNickName = z.string().trim().min(1)
export const User = z.object({
  nickName: z.string().trim().min(1),
  name: z.string().min(1),
  password: z.string().min(1),
  description: z.string(),
  dateBirth: z.coerce.date(),
});

export const Post = z.object({
  // author: z.string().trim().min(1),
  authorId: z.string().min(1),
  date: z.coerce.date(),
  text: z.string().min(1),
});

export const Comment = z.object({
  postId: z.string().min(1),
  // author: z.string().trim().min(1),
  authorId: z.string().min(1),
  date: z.coerce.date(),
  text: z.string().min(1),
});

// DATA TRANSFER OBJECT
