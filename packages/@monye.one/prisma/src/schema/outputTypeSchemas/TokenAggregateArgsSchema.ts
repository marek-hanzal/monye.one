import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TokenWhereInputSchema } from '../inputTypeSchemas/TokenWhereInputSchema'
import { TokenOrderByWithRelationInputSchema } from '../inputTypeSchemas/TokenOrderByWithRelationInputSchema'
import { TokenWhereUniqueInputSchema } from '../inputTypeSchemas/TokenWhereUniqueInputSchema'

export const TokenAggregateArgsSchema: z.ZodType<Prisma.TokenAggregateArgs> = z.object({
  where: TokenWhereInputSchema.optional(),
  orderBy: z.union([ TokenOrderByWithRelationInputSchema.array(),TokenOrderByWithRelationInputSchema ]).optional(),
  cursor: TokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default TokenAggregateArgsSchema;
