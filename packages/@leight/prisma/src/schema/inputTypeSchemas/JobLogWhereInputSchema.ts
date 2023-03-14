import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterSchema } from './StringFilterSchema';
import { JobRelationFilterSchema } from './JobRelationFilterSchema';
import { JobWhereInputSchema } from './JobWhereInputSchema';

export const JobLogWhereInputSchema: z.ZodType<Prisma.JobLogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => JobLogWhereInputSchema),z.lazy(() => JobLogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobLogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobLogWhereInputSchema),z.lazy(() => JobLogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  jobId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  job: z.union([ z.lazy(() => JobRelationFilterSchema),z.lazy(() => JobWhereInputSchema) ]).optional(),
}).strict();

export default JobLogWhereInputSchema;
