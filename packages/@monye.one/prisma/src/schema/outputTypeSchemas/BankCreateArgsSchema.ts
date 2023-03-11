import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankIncludeSchema } from '../inputTypeSchemas/BankIncludeSchema'
import { BankCreateInputSchema } from '../inputTypeSchemas/BankCreateInputSchema'
import { BankUncheckedCreateInputSchema } from '../inputTypeSchemas/BankUncheckedCreateInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { TransactionFindManyArgsSchema } from "../outputTypeSchemas/TransactionFindManyArgsSchema"
import { BankCountOutputTypeArgsSchema } from "../outputTypeSchemas/BankCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BankSelectSchema: z.ZodType<Prisma.BankSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  account: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Transaction: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BankCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const BankCreateArgsSchema: z.ZodType<Prisma.BankCreateArgs> = z.object({
  select: BankSelectSchema.optional(),
  include: BankIncludeSchema.optional(),
  data: z.union([ BankCreateInputSchema,BankUncheckedCreateInputSchema ]),
}).strict()

export default BankCreateArgsSchema;
