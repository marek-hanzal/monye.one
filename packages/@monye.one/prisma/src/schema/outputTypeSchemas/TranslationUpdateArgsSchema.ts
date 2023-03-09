import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TranslationUpdateInputSchema } from '../inputTypeSchemas/TranslationUpdateInputSchema'
import { TranslationUncheckedUpdateInputSchema } from '../inputTypeSchemas/TranslationUncheckedUpdateInputSchema'
import { TranslationWhereUniqueInputSchema } from '../inputTypeSchemas/TranslationWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TranslationSelectSchema: z.ZodType<Prisma.TranslationSelect> = z.object({
  id: z.boolean().optional(),
  locale: z.boolean().optional(),
  label: z.boolean().optional(),
  text: z.boolean().optional(),
  hash: z.boolean().optional(),
}).strict()

export const TranslationUpdateArgsSchema: z.ZodType<Prisma.TranslationUpdateArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  data: z.union([ TranslationUpdateInputSchema,TranslationUncheckedUpdateInputSchema ]),
  where: TranslationWhereUniqueInputSchema,
}).strict()

export default TranslationUpdateArgsSchema;
