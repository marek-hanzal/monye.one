import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const TokenCreateManyInputSchema: z.ZodType<Prisma.TokenCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
}).strict();

export default TokenCreateManyInputSchema;
