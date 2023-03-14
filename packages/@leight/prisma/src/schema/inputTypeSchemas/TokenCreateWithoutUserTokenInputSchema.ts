import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const TokenCreateWithoutUserTokenInputSchema: z.ZodType<Prisma.TokenCreateWithoutUserTokenInput> = z.object({
  id: z.string().optional(),
  name: z.string()
}).strict();

export default TokenCreateWithoutUserTokenInputSchema;
