import { z } from 'zod';
export const validateDescription = z.string().max(300)
export const validateName = z.string().min(1)
export const User = z.object({
  nickName: z.string().trim().min(1),
  name: z.string().min(1),
  password: z.string().min(1),
  description: z.string(),
  dateBirth: z.coerce.date(),
});

// DATA TRANSFER OBJECT
