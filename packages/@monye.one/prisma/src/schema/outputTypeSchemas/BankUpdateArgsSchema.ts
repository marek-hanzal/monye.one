import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankIncludeSchema } from '../inputTypeSchemas/BankIncludeSchema'
import { BankUpdateInputSchema } from '../inputTypeSchemas/BankUpdateInputSchema'
import { BankUncheckedUpdateInputSchema } from '../inputTypeSchemas/BankUncheckedUpdateInputSchema'
import { BankWhereUniqueInputSchema } from '../inputTypeSchemas/BankWhereUniqueInputSchema'
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

export const BankUpdateArgsSchema: z.ZodType<Prisma.BankUpdateArgs> = z.object({
  select: BankSelectSchema.optional(),
  include: BankIncludeSchema.optional(),
  data: z.union([ BankUpdateInputSchema,BankUncheckedUpdateInputSchema ]),
  where: BankWhereUniqueInputSchema,
}).strict()

export default BankUpdateArgsSchema;
