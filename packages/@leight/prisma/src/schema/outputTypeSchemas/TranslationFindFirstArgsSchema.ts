import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TranslationWhereInputSchema } from '../inputTypeSchemas/TranslationWhereInputSchema'
import { TranslationOrderByWithRelationInputSchema } from '../inputTypeSchemas/TranslationOrderByWithRelationInputSchema'
import { TranslationWhereUniqueInputSchema } from '../inputTypeSchemas/TranslationWhereUniqueInputSchema'
import { TranslationScalarFieldEnumSchema } from '../inputTypeSchemas/TranslationScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TranslationSelectSchema: z.ZodType<Prisma.TranslationSelect> = z.object({
  id: z.boolean().optional(),
  locale: z.boolean().optional(),
  label: z.boolean().optional(),
  text: z.boolean().optional(),
  hash: z.boolean().optional(),
}).strict()

export const TranslationFindFirstArgsSchema: z.ZodType<Prisma.TranslationFindFirstArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  where: TranslationWhereInputSchema.optional(),
  orderBy: z.union([ TranslationOrderByWithRelationInputSchema.array(),TranslationOrderByWithRelationInputSchema ]).optional(),
  cursor: TranslationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TranslationScalarFieldEnumSchema.array().optional(),
}).strict()

export default TranslationFindFirstArgsSchema;
