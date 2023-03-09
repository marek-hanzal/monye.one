import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserTokenWhereInputSchema } from '../inputTypeSchemas/UserTokenWhereInputSchema'
import { UserTokenOrderByWithRelationInputSchema } from '../inputTypeSchemas/UserTokenOrderByWithRelationInputSchema'
import { UserTokenWhereUniqueInputSchema } from '../inputTypeSchemas/UserTokenWhereUniqueInputSchema'

export const UserTokenAggregateArgsSchema: z.ZodType<Prisma.UserTokenAggregateArgs> = z.object({
  where: UserTokenWhereInputSchema.optional(),
  orderBy: z.union([ UserTokenOrderByWithRelationInputSchema.array(),UserTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: UserTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default UserTokenAggregateArgsSchema;
