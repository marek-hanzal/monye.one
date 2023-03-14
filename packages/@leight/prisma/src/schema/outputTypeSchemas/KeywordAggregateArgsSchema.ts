import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { KeywordWhereInputSchema } from '../inputTypeSchemas/KeywordWhereInputSchema'
import { KeywordOrderByWithRelationInputSchema } from '../inputTypeSchemas/KeywordOrderByWithRelationInputSchema'
import { KeywordWhereUniqueInputSchema } from '../inputTypeSchemas/KeywordWhereUniqueInputSchema'

export const KeywordAggregateArgsSchema: z.ZodType<Prisma.KeywordAggregateArgs> = z.object({
  where: KeywordWhereInputSchema.optional(),
  orderBy: z.union([ KeywordOrderByWithRelationInputSchema.array(),KeywordOrderByWithRelationInputSchema ]).optional(),
  cursor: KeywordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default KeywordAggregateArgsSchema;
