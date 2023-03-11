import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankIncludeSchema } from '../inputTypeSchemas/BankIncludeSchema'
import { BankWhereInputSchema } from '../inputTypeSchemas/BankWhereInputSchema'
import { BankOrderByWithRelationInputSchema } from '../inputTypeSchemas/BankOrderByWithRelationInputSchema'
import { BankWhereUniqueInputSchema } from '../inputTypeSchemas/BankWhereUniqueInputSchema'
import { BankScalarFieldEnumSchema } from '../inputTypeSchemas/BankScalarFieldEnumSchema'
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

export const BankFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BankFindFirstOrThrowArgs> = z.object({
  select: BankSelectSchema.optional(),
  include: BankIncludeSchema.optional(),
  where: BankWhereInputSchema.optional(),
  orderBy: z.union([ BankOrderByWithRelationInputSchema.array(),BankOrderByWithRelationInputSchema ]).optional(),
  cursor: BankWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BankScalarFieldEnumSchema.array().optional(),
}).strict()

export default BankFindFirstOrThrowArgsSchema;
