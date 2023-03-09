import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const UserTokenUncheckedCreateInputSchema: z.ZodType<Prisma.UserTokenUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  tokenId: z.string(),
}).strict();

export default UserTokenUncheckedCreateInputSchema;
