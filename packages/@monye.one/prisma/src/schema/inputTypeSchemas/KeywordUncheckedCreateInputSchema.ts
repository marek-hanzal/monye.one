import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const KeywordUncheckedCreateInputSchema: z.ZodType<Prisma.KeywordUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string()
}).strict();

export default KeywordUncheckedCreateInputSchema;
