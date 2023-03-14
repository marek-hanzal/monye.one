import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterSchema } from './StringFilterSchema';

export const JobLogScalarWhereInputSchema: z.ZodType<Prisma.JobLogScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => JobLogScalarWhereInputSchema),z.lazy(() => JobLogScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobLogScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobLogScalarWhereInputSchema),z.lazy(() => JobLogScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  jobId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default JobLogScalarWhereInputSchema;
