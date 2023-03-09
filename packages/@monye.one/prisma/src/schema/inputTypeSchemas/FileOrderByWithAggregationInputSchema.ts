import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { FileCountOrderByAggregateInputSchema } from './FileCountOrderByAggregateInputSchema';
import { FileAvgOrderByAggregateInputSchema } from './FileAvgOrderByAggregateInputSchema';
import { FileMaxOrderByAggregateInputSchema } from './FileMaxOrderByAggregateInputSchema';
import { FileMinOrderByAggregateInputSchema } from './FileMinOrderByAggregateInputSchema';
import { FileSumOrderByAggregateInputSchema } from './FileSumOrderByAggregateInputSchema';

export const FileOrderByWithAggregationInputSchema: z.ZodType<Prisma.FileOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  mime: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  ttl: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FileCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FileAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FileMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FileSumOrderByAggregateInputSchema).optional(),
}).strict();

export default FileOrderByWithAggregationInputSchema;
