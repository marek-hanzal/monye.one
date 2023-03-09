import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileWhereInputSchema } from '../inputTypeSchemas/FileWhereInputSchema'

export const FileDeleteManyArgsSchema: z.ZodType<Prisma.FileDeleteManyArgs> = z.object({
  where: FileWhereInputSchema.optional(),
}).strict()

export default FileDeleteManyArgsSchema;
