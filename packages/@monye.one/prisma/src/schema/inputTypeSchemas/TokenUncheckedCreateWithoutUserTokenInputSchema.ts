import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const TokenUncheckedCreateWithoutUserTokenInputSchema: z.ZodType<Prisma.TokenUncheckedCreateWithoutUserTokenInput> = z.object({
  id: z.string().optional(),
  name: z.string()
}).strict();

export default TokenUncheckedCreateWithoutUserTokenInputSchema;
