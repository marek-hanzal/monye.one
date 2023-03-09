import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const UserTokenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserTokenUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  tokenId: z.string(),
}).strict();

export default UserTokenUncheckedCreateWithoutUserInputSchema;
