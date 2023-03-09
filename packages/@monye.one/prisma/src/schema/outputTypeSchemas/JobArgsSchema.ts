import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { JobSelectSchema } from '../inputTypeSchemas/JobSelectSchema';
import { JobIncludeSchema } from '../inputTypeSchemas/JobIncludeSchema';

export const JobArgsSchema: z.ZodType<Prisma.JobArgs> = z.object({
  select: z.lazy(() => JobSelectSchema).optional(),
  include: z.lazy(() => JobIncludeSchema).optional(),
}).strict();

export default JobArgsSchema;
