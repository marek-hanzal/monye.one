import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankWhereInputSchema } from '../inputTypeSchemas/BankWhereInputSchema'
import { BankOrderByWithRelationInputSchema } from '../inputTypeSchemas/BankOrderByWithRelationInputSchema'
import { BankWhereUniqueInputSchema } from '../inputTypeSchemas/BankWhereUniqueInputSchema'

export const BankAggregateArgsSchema: z.ZodType<Prisma.BankAggregateArgs> = z.object({
  where: BankWhereInputSchema.optional(),
  orderBy: z.union([ BankOrderByWithRelationInputSchema.array(),BankOrderByWithRelationInputSchema ]).optional(),
  cursor: BankWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default BankAggregateArgsSchema;
