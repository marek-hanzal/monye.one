import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileWhereInputSchema } from '../inputTypeSchemas/FileWhereInputSchema'
import { FileOrderByWithAggregationInputSchema } from '../inputTypeSchemas/FileOrderByWithAggregationInputSchema'
import { FileScalarFieldEnumSchema } from '../inputTypeSchemas/FileScalarFieldEnumSchema'
import { FileScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/FileScalarWhereWithAggregatesInputSchema'

export const FileGroupByArgsSchema: z.ZodType<Prisma.FileGroupByArgs> = z.object({
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithAggregationInputSchema.array(),FileOrderByWithAggregationInputSchema ]).optional(),
  by: FileScalarFieldEnumSchema.array(),
  having: FileScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default FileGroupByArgsSchema;
