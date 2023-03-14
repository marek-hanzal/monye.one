import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TranslationWhereInputSchema } from '../inputTypeSchemas/TranslationWhereInputSchema'
import { TranslationOrderByWithAggregationInputSchema } from '../inputTypeSchemas/TranslationOrderByWithAggregationInputSchema'
import { TranslationScalarFieldEnumSchema } from '../inputTypeSchemas/TranslationScalarFieldEnumSchema'
import { TranslationScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/TranslationScalarWhereWithAggregatesInputSchema'

export const TranslationGroupByArgsSchema: z.ZodType<Prisma.TranslationGroupByArgs> = z.object({
  where: TranslationWhereInputSchema.optional(),
  orderBy: z.union([ TranslationOrderByWithAggregationInputSchema.array(),TranslationOrderByWithAggregationInputSchema ]).optional(),
  by: TranslationScalarFieldEnumSchema.array(),
  having: TranslationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default TranslationGroupByArgsSchema;
