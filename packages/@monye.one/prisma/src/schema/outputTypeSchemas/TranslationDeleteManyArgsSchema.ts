import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TranslationWhereInputSchema } from '../inputTypeSchemas/TranslationWhereInputSchema'

export const TranslationDeleteManyArgsSchema: z.ZodType<Prisma.TranslationDeleteManyArgs> = z.object({
  where: TranslationWhereInputSchema.optional(),
}).strict()

export default TranslationDeleteManyArgsSchema;
