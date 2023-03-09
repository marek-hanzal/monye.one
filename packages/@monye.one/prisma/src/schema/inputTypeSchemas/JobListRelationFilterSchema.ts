import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobWhereInputSchema } from './JobWhereInputSchema';

export const JobListRelationFilterSchema: z.ZodType<Prisma.JobListRelationFilter> = z.object({
  every: z.lazy(() => JobWhereInputSchema).optional(),
  some: z.lazy(() => JobWhereInputSchema).optional(),
  none: z.lazy(() => JobWhereInputSchema).optional(),
}).strict();

export default JobListRelationFilterSchema;
