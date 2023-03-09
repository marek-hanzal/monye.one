import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobStatusSchema } from './JobStatusSchema';

export const NestedEnumJobStatusFilterSchema: z.ZodType<Prisma.NestedEnumJobStatusFilter> = z.object({
  equals: z.lazy(() => JobStatusSchema).optional(),
  in: z.lazy(() => JobStatusSchema).array().optional(),
  notIn: z.lazy(() => JobStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => JobStatusSchema),z.lazy(() => NestedEnumJobStatusFilterSchema) ]).optional(),
}).strict();

export default NestedEnumJobStatusFilterSchema;
