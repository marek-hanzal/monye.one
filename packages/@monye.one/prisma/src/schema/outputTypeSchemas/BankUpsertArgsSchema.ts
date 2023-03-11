import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankIncludeSchema } from '../inputTypeSchemas/BankIncludeSchema'
import { BankWhereUniqueInputSchema } from '../inputTypeSchemas/BankWhereUniqueInputSchema'
import { BankCreateInputSchema } from '../inputTypeSchemas/BankCreateInputSchema'
import { BankUncheckedCreateInputSchema } from '../inputTypeSchemas/BankUncheckedCreateInputSchema'
import { BankUpdateInputSchema } from '../inputTypeSchemas/BankUpdateInputSchema'
import { BankUncheckedUpdateInputSchema } from '../inputTypeSchemas/BankUncheckedUpdateInputSchema'
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

export const BankUpsertArgsSchema: z.ZodType<Prisma.BankUpsertArgs> = z.object({
  select: BankSelectSchema.optional(),
  include: BankIncludeSchema.optional(),
  where: BankWhereUniqueInputSchema,
  create: z.union([ BankCreateInputSchema,BankUncheckedCreateInputSchema ]),
  update: z.union([ BankUpdateInputSchema,BankUncheckedUpdateInputSchema ]),
}).strict()

export default BankUpsertArgsSchema;
