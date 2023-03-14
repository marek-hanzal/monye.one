import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { KeywordWhereInputSchema } from '../inputTypeSchemas/KeywordWhereInputSchema'
import { KeywordOrderByWithRelationInputSchema } from '../inputTypeSchemas/KeywordOrderByWithRelationInputSchema'
import { KeywordWhereUniqueInputSchema } from '../inputTypeSchemas/KeywordWhereUniqueInputSchema'
import { KeywordScalarFieldEnumSchema } from '../inputTypeSchemas/KeywordScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const KeywordSelectSchema: z.ZodType<Prisma.KeywordSelect> = z.object({
  id: z.boolean().optional(),
  text: z.boolean().optional(),
}).strict()

export const KeywordFindFirstArgsSchema: z.ZodType<Prisma.KeywordFindFirstArgs> = z.object({
  select: KeywordSelectSchema.optional(),
  where: KeywordWhereInputSchema.optional(),
  orderBy: z.union([ KeywordOrderByWithRelationInputSchema.array(),KeywordOrderByWithRelationInputSchema ]).optional(),
  cursor: KeywordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: KeywordScalarFieldEnumSchema.array().optional(),
}).strict()

export default KeywordFindFirstArgsSchema;
