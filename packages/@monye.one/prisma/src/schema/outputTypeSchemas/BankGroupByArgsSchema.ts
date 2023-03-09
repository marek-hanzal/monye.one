import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankWhereInputSchema } from '../inputTypeSchemas/BankWhereInputSchema'
import { BankOrderByWithAggregationInputSchema } from '../inputTypeSchemas/BankOrderByWithAggregationInputSchema'
import { BankScalarFieldEnumSchema } from '../inputTypeSchemas/BankScalarFieldEnumSchema'
import { BankScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/BankScalarWhereWithAggregatesInputSchema'

export const BankGroupByArgsSchema: z.ZodType<Prisma.BankGroupByArgs> = z.object({
  where: BankWhereInputSchema.optional(),
  orderBy: z.union([ BankOrderByWithAggregationInputSchema.array(),BankOrderByWithAggregationInputSchema ]).optional(),
  by: BankScalarFieldEnumSchema.array(),
  having: BankScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default BankGroupByArgsSchema;
