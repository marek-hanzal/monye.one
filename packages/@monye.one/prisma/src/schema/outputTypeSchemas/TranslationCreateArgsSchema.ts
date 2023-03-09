import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TranslationCreateInputSchema } from '../inputTypeSchemas/TranslationCreateInputSchema'
import { TranslationUncheckedCreateInputSchema } from '../inputTypeSchemas/TranslationUncheckedCreateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TranslationSelectSchema: z.ZodType<Prisma.TranslationSelect> = z.object({
  id: z.boolean().optional(),
  locale: z.boolean().optional(),
  label: z.boolean().optional(),
  text: z.boolean().optional(),
  hash: z.boolean().optional(),
}).strict()

export const TranslationCreateArgsSchema: z.ZodType<Prisma.TranslationCreateArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  data: z.union([ TranslationCreateInputSchema,TranslationUncheckedCreateInputSchema ]),
}).strict()

export default TranslationCreateArgsSchema;
