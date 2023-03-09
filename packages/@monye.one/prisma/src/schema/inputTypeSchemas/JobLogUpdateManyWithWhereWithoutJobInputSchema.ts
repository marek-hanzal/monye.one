import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobLogScalarWhereInputSchema } from './JobLogScalarWhereInputSchema';
import { JobLogUpdateManyMutationInputSchema } from './JobLogUpdateManyMutationInputSchema';
import { JobLogUncheckedUpdateManyWithoutLogsInputSchema } from './JobLogUncheckedUpdateManyWithoutLogsInputSchema';

export const JobLogUpdateManyWithWhereWithoutJobInputSchema: z.ZodType<Prisma.JobLogUpdateManyWithWhereWithoutJobInput> = z.object({
  where: z.lazy(() => JobLogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => JobLogUpdateManyMutationInputSchema),z.lazy(() => JobLogUncheckedUpdateManyWithoutLogsInputSchema) ]),
}).strict();

export default JobLogUpdateManyWithWhereWithoutJobInputSchema;
