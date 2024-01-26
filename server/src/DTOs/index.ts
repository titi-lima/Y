export { z } from 'zod';

export const User = z.object({
    nickName: z.string().nonempty(),
    name: z.string().nonempty(),
    password: z.string().nonempty(),
    description: z.string().optional(),
    dateBird: z.date().nonempty()
});