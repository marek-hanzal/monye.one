import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const UserTokenCreateManyTokenInputSchema: z.ZodType<Prisma.UserTokenCreateManyTokenInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string()
}).strict();

export default UserTokenCreateManyTokenInputSchema;
