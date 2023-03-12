import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const KeywordSelectSchema: z.ZodType<Prisma.KeywordSelect> = z.object({
  id: z.boolean().optional(),
  text: z.boolean().optional(),
}).strict()

export default KeywordSelectSchema;
