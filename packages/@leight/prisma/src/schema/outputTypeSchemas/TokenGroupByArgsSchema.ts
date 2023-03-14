import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TokenWhereInputSchema } from '../inputTypeSchemas/TokenWhereInputSchema'
import { TokenOrderByWithAggregationInputSchema } from '../inputTypeSchemas/TokenOrderByWithAggregationInputSchema'
import { TokenScalarFieldEnumSchema } from '../inputTypeSchemas/TokenScalarFieldEnumSchema'
import { TokenScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/TokenScalarWhereWithAggregatesInputSchema'

export const TokenGroupByArgsSchema: z.ZodType<Prisma.TokenGroupByArgs> = z.object({
  where: TokenWhereInputSchema.optional(),
  orderBy: z.union([ TokenOrderByWithAggregationInputSchema.array(),TokenOrderByWithAggregationInputSchema ]).optional(),
  by: TokenScalarFieldEnumSchema.array(),
  having: TokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default TokenGroupByArgsSchema;
