import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobStatusSchema } from './JobStatusSchema';
import { NestedEnumJobStatusWithAggregatesFilterSchema } from './NestedEnumJobStatusWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumJobStatusFilterSchema } from './NestedEnumJobStatusFilterSchema';

export const EnumJobStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumJobStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => JobStatusSchema).optional(),
  in: z.lazy(() => JobStatusSchema).array().optional(),
  notIn: z.lazy(() => JobStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => JobStatusSchema),z.lazy(() => NestedEnumJobStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumJobStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumJobStatusFilterSchema).optional()
}).strict();

export default EnumJobStatusWithAggregatesFilterSchema;
