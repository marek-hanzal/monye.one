import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { KeywordUpdateManyMutationInputSchema } from '../inputTypeSchemas/KeywordUpdateManyMutationInputSchema'
import { KeywordUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/KeywordUncheckedUpdateManyInputSchema'
import { KeywordWhereInputSchema } from '../inputTypeSchemas/KeywordWhereInputSchema'

export const KeywordUpdateManyArgsSchema: z.ZodType<Prisma.KeywordUpdateManyArgs> = z.object({
  data: z.union([ KeywordUpdateManyMutationInputSchema,KeywordUncheckedUpdateManyInputSchema ]),
  where: KeywordWhereInputSchema.optional(),
}).strict()

export default KeywordUpdateManyArgsSchema;
