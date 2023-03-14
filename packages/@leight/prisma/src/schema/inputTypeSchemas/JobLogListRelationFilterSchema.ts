import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobLogWhereInputSchema } from './JobLogWhereInputSchema';

export const JobLogListRelationFilterSchema: z.ZodType<Prisma.JobLogListRelationFilter> = z.object({
  every: z.lazy(() => JobLogWhereInputSchema).optional(),
  some: z.lazy(() => JobLogWhereInputSchema).optional(),
  none: z.lazy(() => JobLogWhereInputSchema).optional()
}).strict();

export default JobLogListRelationFilterSchema;
