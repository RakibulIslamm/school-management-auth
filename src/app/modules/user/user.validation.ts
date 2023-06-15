import { z } from 'zod';

export const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'Role is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
//   await createUserZodSchema.parseAsync(req)
