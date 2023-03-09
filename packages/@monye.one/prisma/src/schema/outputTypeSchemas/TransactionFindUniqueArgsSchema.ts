import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionIncludeSchema } from '../inputTypeSchemas/TransactionIncludeSchema'
import { TransactionWhereUniqueInputSchema } from '../inputTypeSchemas/TransactionWhereUniqueInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { BankArgsSchema } from "../outputTypeSchemas/BankArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TransactionSelectSchema: z.ZodType<Prisma.TransactionSelect> = z.object({
  id: z.boolean().optional(),
  reference: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  bankId: z.boolean().optional(),
  bank: z.union([z.boolean(),z.lazy(() => BankArgsSchema)]).optional(),
  amount: z.boolean().optional(),
  variable: z.boolean().optional(),
  symbol: z.boolean().optional(),
  static: z.boolean().optional(),
  date: z.boolean().optional(),
  target: z.boolean().optional(),
  note: z.boolean().optional(),
}).strict()

export const TransactionFindUniqueArgsSchema: z.ZodType<Prisma.TransactionFindUniqueArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
}).strict()

export default TransactionFindUniqueArgsSchema;
