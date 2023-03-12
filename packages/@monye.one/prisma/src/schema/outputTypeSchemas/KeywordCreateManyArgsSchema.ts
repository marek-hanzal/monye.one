import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { KeywordCreateManyInputSchema } from '../inputTypeSchemas/KeywordCreateManyInputSchema'

export const KeywordCreateManyArgsSchema: z.ZodType<Prisma.KeywordCreateManyArgs> = z.object({
  data: z.union([ KeywordCreateManyInputSchema,KeywordCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default KeywordCreateManyArgsSchema;
