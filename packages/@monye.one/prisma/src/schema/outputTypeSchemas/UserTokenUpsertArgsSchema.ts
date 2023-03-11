import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserTokenIncludeSchema } from '../inputTypeSchemas/UserTokenIncludeSchema'
import { UserTokenWhereUniqueInputSchema } from '../inputTypeSchemas/UserTokenWhereUniqueInputSchema'
import { UserTokenCreateInputSchema } from '../inputTypeSchemas/UserTokenCreateInputSchema'
import { UserTokenUncheckedCreateInputSchema } from '../inputTypeSchemas/UserTokenUncheckedCreateInputSchema'
import { UserTokenUpdateInputSchema } from '../inputTypeSchemas/UserTokenUpdateInputSchema'
import { UserTokenUncheckedUpdateInputSchema } from '../inputTypeSchemas/UserTokenUncheckedUpdateInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { TokenArgsSchema } from "../outputTypeSchemas/TokenArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserTokenSelectSchema: z.ZodType<Prisma.UserTokenSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  tokenId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  token: z.union([z.boolean(),z.lazy(() => TokenArgsSchema)]).optional(),
}).strict()

export const UserTokenUpsertArgsSchema: z.ZodType<Prisma.UserTokenUpsertArgs> = z.object({
  select: UserTokenSelectSchema.optional(),
  include: UserTokenIncludeSchema.optional(),
  where: UserTokenWhereUniqueInputSchema,
  create: z.union([ UserTokenCreateInputSchema,UserTokenUncheckedCreateInputSchema ]),
  update: z.union([ UserTokenUpdateInputSchema,UserTokenUncheckedUpdateInputSchema ]),
}).strict()

export default UserTokenUpsertArgsSchema;
