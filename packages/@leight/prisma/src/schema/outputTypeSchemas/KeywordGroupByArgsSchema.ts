import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { KeywordWhereInputSchema } from '../inputTypeSchemas/KeywordWhereInputSchema'
import { KeywordOrderByWithAggregationInputSchema } from '../inputTypeSchemas/KeywordOrderByWithAggregationInputSchema'
import { KeywordScalarFieldEnumSchema } from '../inputTypeSchemas/KeywordScalarFieldEnumSchema'
import { KeywordScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/KeywordScalarWhereWithAggregatesInputSchema'

export const KeywordGroupByArgsSchema: z.ZodType<Prisma.KeywordGroupByArgs> = z.object({
  where: KeywordWhereInputSchema.optional(),
  orderBy: z.union([ KeywordOrderByWithAggregationInputSchema.array(),KeywordOrderByWithAggregationInputSchema ]).optional(),
  by: KeywordScalarFieldEnumSchema.array(),
  having: KeywordScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default KeywordGroupByArgsSchema;
