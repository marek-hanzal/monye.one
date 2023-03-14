import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { KeywordCreateInputSchema } from '../inputTypeSchemas/KeywordCreateInputSchema'
import { KeywordUncheckedCreateInputSchema } from '../inputTypeSchemas/KeywordUncheckedCreateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const KeywordSelectSchema: z.ZodType<Prisma.KeywordSelect> = z.object({
  id: z.boolean().optional(),
  text: z.boolean().optional(),
}).strict()

export const KeywordCreateArgsSchema: z.ZodType<Prisma.KeywordCreateArgs> = z.object({
  select: KeywordSelectSchema.optional(),
  data: z.union([ KeywordCreateInputSchema,KeywordUncheckedCreateInputSchema ]),
}).strict()

export default KeywordCreateArgsSchema;
