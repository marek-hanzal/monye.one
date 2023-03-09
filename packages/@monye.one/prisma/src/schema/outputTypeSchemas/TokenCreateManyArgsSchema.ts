import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TokenCreateManyInputSchema } from '../inputTypeSchemas/TokenCreateManyInputSchema'

export const TokenCreateManyArgsSchema: z.ZodType<Prisma.TokenCreateManyArgs> = z.object({
  data: TokenCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default TokenCreateManyArgsSchema;
