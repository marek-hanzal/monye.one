import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobStatusSchema } from './JobStatusSchema';
import { NestedEnumJobStatusFilterSchema } from './NestedEnumJobStatusFilterSchema';

export const EnumJobStatusFilterSchema: z.ZodType<Prisma.EnumJobStatusFilter> = z.object({
  equals: z.lazy(() => JobStatusSchema).optional(),
  in: z.lazy(() => JobStatusSchema).array().optional(),
  notIn: z.lazy(() => JobStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => JobStatusSchema),z.lazy(() => NestedEnumJobStatusFilterSchema) ]).optional(),
}).strict();

export default EnumJobStatusFilterSchema;
