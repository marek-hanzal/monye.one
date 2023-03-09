import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TokenWhereInputSchema } from '../inputTypeSchemas/TokenWhereInputSchema'

export const TokenDeleteManyArgsSchema: z.ZodType<Prisma.TokenDeleteManyArgs> = z.object({
  where: TokenWhereInputSchema.optional(),
}).strict()

export default TokenDeleteManyArgsSchema;
