import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const TranslationCreateManyInputSchema: z.ZodType<Prisma.TranslationCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  locale: z.string(),
  label: z.string(),
  text: z.string(),
  hash: z.string(),
}).strict();

export default TranslationCreateManyInputSchema;
