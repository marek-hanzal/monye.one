import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserTokenCreateManyInputSchema } from '../inputTypeSchemas/UserTokenCreateManyInputSchema'

export const UserTokenCreateManyArgsSchema: z.ZodType<Prisma.UserTokenCreateManyArgs> = z.object({
  data: z.union([ UserTokenCreateManyInputSchema,UserTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default UserTokenCreateManyArgsSchema;
