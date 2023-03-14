import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobWhereInputSchema } from './JobWhereInputSchema';

export const JobRelationFilterSchema: z.ZodType<Prisma.JobRelationFilter> = z.object({
  is: z.lazy(() => JobWhereInputSchema).optional(),
  isNot: z.lazy(() => JobWhereInputSchema).optional()
}).strict();

export default JobRelationFilterSchema;
