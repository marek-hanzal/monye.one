import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const TranslationLocaleHashCompoundUniqueInputSchema: z.ZodType<Prisma.TranslationLocaleHashCompoundUniqueInput> = z.object({
  locale: z.string(),
  hash: z.string(),
}).strict();

export default TranslationLocaleHashCompoundUniqueInputSchema;
