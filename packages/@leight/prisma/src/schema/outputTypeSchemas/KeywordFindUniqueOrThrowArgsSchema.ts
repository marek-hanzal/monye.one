import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { KeywordWhereUniqueInputSchema } from '../inputTypeSchemas/KeywordWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const KeywordSelectSchema: z.ZodType<Prisma.KeywordSelect> = z.object({
  id: z.boolean().optional(),
  text: z.boolean().optional(),
}).strict()

export const KeywordFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.KeywordFindUniqueOrThrowArgs> = z.object({
  select: KeywordSelectSchema.optional(),
  where: KeywordWhereUniqueInputSchema,
}).strict()

export default KeywordFindUniqueOrThrowArgsSchema;
