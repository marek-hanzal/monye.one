import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const KeywordWhereUniqueInputSchema: z.ZodType<Prisma.KeywordWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string().optional()
}).strict();

export default KeywordWhereUniqueInputSchema;
