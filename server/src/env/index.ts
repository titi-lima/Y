/* eslint-disable no-unused-vars */
import { z } from 'zod';

const envSchema = z.object({
  SERVER_PORT: z.coerce.number().default(3001),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string(),
});

const envValidation = envSchema.safeParse(process.env);

if (!envValidation.success) {
  console.error('Invalid environment variables', envValidation.error.format());

  throw new Error('Invalid environment variables');
}

declare global {
  namespace NodeJS {
    interface ProcessEnv
      extends Record<keyof z.infer<typeof envSchema>, string> {}
  }
}

export default envValidation.data;
