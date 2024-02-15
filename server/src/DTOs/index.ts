import { z } from 'zod';

export const User = z.object({
  nickName: z
    .string({ required_error: 'O nickname é obrigatório.' })
    .trim()
    .min(1),
  name: z
    .string({
      required_error: 'O nome é obrigatório.',
    })
    .min(1),
  password: z.string({ required_error: 'A senha é obrigatória.' }).min(1),
  description: z.string({ required_error: 'A descrição é obrigatória.' }),
  dateBirth: z.coerce.date({
    required_error: 'A data de nascimento é obrigatória.',
  }),
});

// DATA TRANSFER OBJECT
