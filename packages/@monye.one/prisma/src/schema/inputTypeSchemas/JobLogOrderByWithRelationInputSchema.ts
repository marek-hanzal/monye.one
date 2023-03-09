import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { JobOrderByWithRelationInputSchema } from './JobOrderByWithRelationInputSchema';

export const JobLogOrderByWithRelationInputSchema: z.ZodType<Prisma.JobLogOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobId: z.lazy(() => SortOrderSchema).optional(),
  job: z.lazy(() => JobOrderByWithRelationInputSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export default JobLogOrderByWithRelationInputSchema;
