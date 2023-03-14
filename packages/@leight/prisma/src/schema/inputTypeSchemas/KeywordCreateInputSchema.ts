import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const KeywordCreateInputSchema: z.ZodType<Prisma.KeywordCreateInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string()
}).strict();

export default KeywordCreateInputSchema;
