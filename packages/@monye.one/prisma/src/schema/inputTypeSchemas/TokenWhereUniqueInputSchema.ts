import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const TokenWhereUniqueInputSchema: z.ZodType<Prisma.TokenWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
}).strict();

export default TokenWhereUniqueInputSchema;
