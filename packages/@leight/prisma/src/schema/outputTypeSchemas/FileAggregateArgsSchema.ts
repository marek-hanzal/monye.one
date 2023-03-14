import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileWhereInputSchema } from '../inputTypeSchemas/FileWhereInputSchema'
import { FileOrderByWithRelationInputSchema } from '../inputTypeSchemas/FileOrderByWithRelationInputSchema'
import { FileWhereUniqueInputSchema } from '../inputTypeSchemas/FileWhereUniqueInputSchema'

export const FileAggregateArgsSchema: z.ZodType<Prisma.FileAggregateArgs> = z.object({
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithRelationInputSchema.array(),FileOrderByWithRelationInputSchema ]).optional(),
  cursor: FileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default FileAggregateArgsSchema;
