import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const KeywordCreateManyInputSchema: z.ZodType<Prisma.KeywordCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string()
}).strict();

export default KeywordCreateManyInputSchema;
