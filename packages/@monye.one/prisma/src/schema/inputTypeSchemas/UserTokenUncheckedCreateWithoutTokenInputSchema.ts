import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const UserTokenUncheckedCreateWithoutTokenInputSchema: z.ZodType<Prisma.UserTokenUncheckedCreateWithoutTokenInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
}).strict();

export default UserTokenUncheckedCreateWithoutTokenInputSchema;
