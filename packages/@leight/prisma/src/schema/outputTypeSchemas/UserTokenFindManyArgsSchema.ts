import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserTokenIncludeSchema } from '../inputTypeSchemas/UserTokenIncludeSchema'
import { UserTokenWhereInputSchema } from '../inputTypeSchemas/UserTokenWhereInputSchema'
import { UserTokenOrderByWithRelationInputSchema } from '../inputTypeSchemas/UserTokenOrderByWithRelationInputSchema'
import { UserTokenWhereUniqueInputSchema } from '../inputTypeSchemas/UserTokenWhereUniqueInputSchema'
import { UserTokenScalarFieldEnumSchema } from '../inputTypeSchemas/UserTokenScalarFieldEnumSchema'
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

export const UserTokenFindManyArgsSchema: z.ZodType<Prisma.UserTokenFindManyArgs> = z.object({
  select: UserTokenSelectSchema.optional(),
  include: UserTokenIncludeSchema.optional(),
  where: UserTokenWhereInputSchema.optional(),
  orderBy: z.union([ UserTokenOrderByWithRelationInputSchema.array(),UserTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: UserTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserTokenScalarFieldEnumSchema.array().optional(),
}).strict()

export default UserTokenFindManyArgsSchema;
