import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserTokenIncludeSchema } from '../inputTypeSchemas/UserTokenIncludeSchema'
import { UserTokenUpdateInputSchema } from '../inputTypeSchemas/UserTokenUpdateInputSchema'
import { UserTokenUncheckedUpdateInputSchema } from '../inputTypeSchemas/UserTokenUncheckedUpdateInputSchema'
import { UserTokenWhereUniqueInputSchema } from '../inputTypeSchemas/UserTokenWhereUniqueInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { TokenArgsSchema } from "../outputTypeSchemas/TokenArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserTokenSelectSchema: z.ZodType<Prisma.UserTokenSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  tokenId: z.boolean().optional(),
  token: z.union([z.boolean(),z.lazy(() => TokenArgsSchema)]).optional(),
}).strict()

export const UserTokenUpdateArgsSchema: z.ZodType<Prisma.UserTokenUpdateArgs> = z.object({
  select: UserTokenSelectSchema.optional(),
  include: UserTokenIncludeSchema.optional(),
  data: z.union([ UserTokenUpdateInputSchema,UserTokenUncheckedUpdateInputSchema ]),
  where: UserTokenWhereUniqueInputSchema,
}).strict()

export default UserTokenUpdateArgsSchema;
