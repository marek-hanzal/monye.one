import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { KeywordWhereUniqueInputSchema } from '../inputTypeSchemas/KeywordWhereUniqueInputSchema'
import { KeywordCreateInputSchema } from '../inputTypeSchemas/KeywordCreateInputSchema'
import { KeywordUncheckedCreateInputSchema } from '../inputTypeSchemas/KeywordUncheckedCreateInputSchema'
import { KeywordUpdateInputSchema } from '../inputTypeSchemas/KeywordUpdateInputSchema'
import { KeywordUncheckedUpdateInputSchema } from '../inputTypeSchemas/KeywordUncheckedUpdateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const KeywordSelectSchema: z.ZodType<Prisma.KeywordSelect> = z.object({
  id: z.boolean().optional(),
  text: z.boolean().optional(),
}).strict()

export const KeywordUpsertArgsSchema: z.ZodType<Prisma.KeywordUpsertArgs> = z.object({
  select: KeywordSelectSchema.optional(),
  where: KeywordWhereUniqueInputSchema,
  create: z.union([ KeywordCreateInputSchema,KeywordUncheckedCreateInputSchema ]),
  update: z.union([ KeywordUpdateInputSchema,KeywordUncheckedUpdateInputSchema ]),
}).strict()

export default KeywordUpsertArgsSchema;
