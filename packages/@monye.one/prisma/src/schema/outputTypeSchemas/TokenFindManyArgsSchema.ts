import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TokenIncludeSchema } from '../inputTypeSchemas/TokenIncludeSchema'
import { TokenWhereInputSchema } from '../inputTypeSchemas/TokenWhereInputSchema'
import { TokenOrderByWithRelationInputSchema } from '../inputTypeSchemas/TokenOrderByWithRelationInputSchema'
import { TokenWhereUniqueInputSchema } from '../inputTypeSchemas/TokenWhereUniqueInputSchema'
import { TokenScalarFieldEnumSchema } from '../inputTypeSchemas/TokenScalarFieldEnumSchema'
import { UserTokenFindManyArgsSchema } from "../outputTypeSchemas/UserTokenFindManyArgsSchema"
import { TokenCountOutputTypeArgsSchema } from "../outputTypeSchemas/TokenCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TokenSelectSchema: z.ZodType<Prisma.TokenSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  UserToken: z.union([z.boolean(),z.lazy(() => UserTokenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TokenCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TokenFindManyArgsSchema: z.ZodType<Prisma.TokenFindManyArgs> = z.object({
  select: TokenSelectSchema.optional(),
  include: TokenIncludeSchema.optional(),
  where: TokenWhereInputSchema.optional(),
  orderBy: z.union([ TokenOrderByWithRelationInputSchema.array(),TokenOrderByWithRelationInputSchema ]).optional(),
  cursor: TokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TokenScalarFieldEnumSchema.array().optional(),
}).strict()

export default TokenFindManyArgsSchema;
