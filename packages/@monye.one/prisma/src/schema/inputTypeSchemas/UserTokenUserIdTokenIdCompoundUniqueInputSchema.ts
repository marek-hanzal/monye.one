import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const UserTokenUserIdTokenIdCompoundUniqueInputSchema: z.ZodType<Prisma.UserTokenUserIdTokenIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  tokenId: z.string(),
}).strict();

export default UserTokenUserIdTokenIdCompoundUniqueInputSchema;
