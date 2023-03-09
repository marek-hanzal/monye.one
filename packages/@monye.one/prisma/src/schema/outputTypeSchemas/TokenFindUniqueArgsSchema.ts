import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TokenIncludeSchema } from '../inputTypeSchemas/TokenIncludeSchema'
import { TokenWhereUniqueInputSchema } from '../inputTypeSchemas/TokenWhereUniqueInputSchema'
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

export const TokenFindUniqueArgsSchema: z.ZodType<Prisma.TokenFindUniqueArgs> = z.object({
  select: TokenSelectSchema.optional(),
  include: TokenIncludeSchema.optional(),
  where: TokenWhereUniqueInputSchema,
}).strict()

export default TokenFindUniqueArgsSchema;
