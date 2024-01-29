import { z } from 'zod';

export const User = z.object({
  nickName: z.string().trim().min(1),
  name: z.string().min(1),
  password: z.string().min(1),
  description: z.string(),
  dateBirth: z.date(),
});

// DATA TRANSFER OBJECT