import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const UserTokenCreateManyUserInputSchema: z.ZodType<Prisma.UserTokenCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  tokenId: z.string(),
}).strict();

export default UserTokenCreateManyUserInputSchema;
