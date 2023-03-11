import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobLogSelectSchema } from '../inputTypeSchemas/JobLogSelectSchema';
import { JobLogIncludeSchema } from '../inputTypeSchemas/JobLogIncludeSchema';

export const JobLogArgsSchema: z.ZodType<Prisma.JobLogArgs> = z.object({
  select: z.lazy(() => JobLogSelectSchema).optional(),
  include: z.lazy(() => JobLogIncludeSchema).optional(),
}).strict();

export default JobLogArgsSchema;
