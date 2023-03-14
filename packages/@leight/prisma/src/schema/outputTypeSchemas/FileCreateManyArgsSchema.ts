import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileCreateManyInputSchema } from '../inputTypeSchemas/FileCreateManyInputSchema'

export const FileCreateManyArgsSchema: z.ZodType<Prisma.FileCreateManyArgs> = z.object({
  data: z.union([ FileCreateManyInputSchema,FileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default FileCreateManyArgsSchema;
