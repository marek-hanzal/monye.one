import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionIncludeSchema } from '../inputTypeSchemas/TransactionIncludeSchema'
import { TransactionWhereInputSchema } from '../inputTypeSchemas/TransactionWhereInputSchema'
import { TransactionOrderByWithRelationInputSchema } from '../inputTypeSchemas/TransactionOrderByWithRelationInputSchema'
import { TransactionWhereUniqueInputSchema } from '../inputTypeSchemas/TransactionWhereUniqueInputSchema'
import { TransactionScalarFieldEnumSchema } from '../inputTypeSchemas/TransactionScalarFieldEnumSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { BankArgsSchema } from "../outputTypeSchemas/BankArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TransactionSelectSchema: z.ZodType<Prisma.TransactionSelect> = z.object({
  id: z.boolean().optional(),
  reference: z.boolean().optional(),
  userId: z.boolean().optional(),
  bankId: z.boolean().optional(),
  amount: z.boolean().optional(),
  variable: z.boolean().optional(),
  symbol: z.boolean().optional(),
  static: z.boolean().optional(),
  date: z.boolean().optional(),
  target: z.boolean().optional(),
  note: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  bank: z.union([z.boolean(),z.lazy(() => BankArgsSchema)]).optional(),
}).strict()

export const TransactionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TransactionFindFirstOrThrowArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TransactionScalarFieldEnumSchema.array().optional(),
}).strict()

export default TransactionFindFirstOrThrowArgsSchema;
