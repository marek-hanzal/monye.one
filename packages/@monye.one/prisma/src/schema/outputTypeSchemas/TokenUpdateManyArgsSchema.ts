import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TokenUpdateManyMutationInputSchema } from '../inputTypeSchemas/TokenUpdateManyMutationInputSchema'
import { TokenUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/TokenUncheckedUpdateManyInputSchema'
import { TokenWhereInputSchema } from '../inputTypeSchemas/TokenWhereInputSchema'

export const TokenUpdateManyArgsSchema: z.ZodType<Prisma.TokenUpdateManyArgs> = z.object({
  data: z.union([ TokenUpdateManyMutationInputSchema,TokenUncheckedUpdateManyInputSchema ]),
  where: TokenWhereInputSchema.optional(),
}).strict()

export default TokenUpdateManyArgsSchema;
