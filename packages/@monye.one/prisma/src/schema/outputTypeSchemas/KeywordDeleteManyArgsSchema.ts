import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { KeywordWhereInputSchema } from '../inputTypeSchemas/KeywordWhereInputSchema'

export const KeywordDeleteManyArgsSchema: z.ZodType<Prisma.KeywordDeleteManyArgs> = z.object({
  where: KeywordWhereInputSchema.optional(),
}).strict()

export default KeywordDeleteManyArgsSchema;
