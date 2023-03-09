import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TranslationLocaleHashCompoundUniqueInputSchema } from './TranslationLocaleHashCompoundUniqueInputSchema';

export const TranslationWhereUniqueInputSchema: z.ZodType<Prisma.TranslationWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  locale_hash: z.lazy(() => TranslationLocaleHashCompoundUniqueInputSchema).optional(),
}).strict();

export default TranslationWhereUniqueInputSchema;
