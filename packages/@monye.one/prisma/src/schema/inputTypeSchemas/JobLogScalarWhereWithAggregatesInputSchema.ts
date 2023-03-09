import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';

export const JobLogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.JobLogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => JobLogScalarWhereWithAggregatesInputSchema),z.lazy(() => JobLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobLogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobLogScalarWhereWithAggregatesInputSchema),z.lazy(() => JobLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  jobId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default JobLogScalarWhereWithAggregatesInputSchema;
