import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileWhereInputSchema } from './FileWhereInputSchema';

export const FileListRelationFilterSchema: z.ZodType<Prisma.FileListRelationFilter> = z.object({
  every: z.lazy(() => FileWhereInputSchema).optional(),
  some: z.lazy(() => FileWhereInputSchema).optional(),
  none: z.lazy(() => FileWhereInputSchema).optional(),
}).strict();

export default FileListRelationFilterSchema;
