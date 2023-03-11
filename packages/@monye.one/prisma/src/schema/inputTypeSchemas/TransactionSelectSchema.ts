import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { BankArgsSchema } from "../outputTypeSchemas/BankArgsSchema"

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

export default TransactionSelectSchema;
