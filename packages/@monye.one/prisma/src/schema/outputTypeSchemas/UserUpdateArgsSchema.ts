import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserIncludeSchema } from '../inputTypeSchemas/UserIncludeSchema'
import { UserUpdateInputSchema } from '../inputTypeSchemas/UserUpdateInputSchema'
import { UserUncheckedUpdateInputSchema } from '../inputTypeSchemas/UserUncheckedUpdateInputSchema'
import { UserWhereUniqueInputSchema } from '../inputTypeSchemas/UserWhereUniqueInputSchema'
import { AccountFindManyArgsSchema } from "../outputTypeSchemas/AccountFindManyArgsSchema"
import { SessionFindManyArgsSchema } from "../outputTypeSchemas/SessionFindManyArgsSchema"
import { UserTokenFindManyArgsSchema } from "../outputTypeSchemas/UserTokenFindManyArgsSchema"
import { TransactionFindManyArgsSchema } from "../outputTypeSchemas/TransactionFindManyArgsSchema"
import { JobFindManyArgsSchema } from "../outputTypeSchemas/JobFindManyArgsSchema"
import { FileFindManyArgsSchema } from "../outputTypeSchemas/FileFindManyArgsSchema"
import { BankFindManyArgsSchema } from "../outputTypeSchemas/BankFindManyArgsSchema"
import { UserCountOutputTypeArgsSchema } from "../outputTypeSchemas/UserCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  UserToken: z.union([z.boolean(),z.lazy(() => UserTokenFindManyArgsSchema)]).optional(),
  Transaction: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  Job: z.union([z.boolean(),z.lazy(() => JobFindManyArgsSchema)]).optional(),
  File: z.union([z.boolean(),z.lazy(() => FileFindManyArgsSchema)]).optional(),
  Bank: z.union([z.boolean(),z.lazy(() => BankFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export default UserUpdateArgsSchema;