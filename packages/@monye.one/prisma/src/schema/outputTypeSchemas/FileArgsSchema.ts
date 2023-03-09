import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { FileSelectSchema } from '../inputTypeSchemas/FileSelectSchema';
import { FileIncludeSchema } from '../inputTypeSchemas/FileIncludeSchema';

export const FileArgsSchema: z.ZodType<Prisma.FileArgs> = z.object({
  select: z.lazy(() => FileSelectSchema).optional(),
  include: z.lazy(() => FileIncludeSchema).optional(),
}).strict();

export default FileArgsSchema;
