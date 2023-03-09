import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const FileAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FileAvgOrderByAggregateInput> = z.object({
  size: z.lazy(() => SortOrderSchema).optional(),
  ttl: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export default FileAvgOrderByAggregateInputSchema;
