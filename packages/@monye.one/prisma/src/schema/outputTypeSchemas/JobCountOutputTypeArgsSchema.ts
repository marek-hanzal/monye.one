import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobCountOutputTypeSelectSchema } from './JobCountOutputTypeSelectSchema';

export const JobCountOutputTypeArgsSchema: z.ZodType<Prisma.JobCountOutputTypeArgs> = z.object({
  select: z.lazy(() => JobCountOutputTypeSelectSchema).nullish(),
}).strict();

export default JobCountOutputTypeSelectSchema;
