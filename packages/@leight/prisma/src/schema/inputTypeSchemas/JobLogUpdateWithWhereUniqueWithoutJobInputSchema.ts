import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobLogWhereUniqueInputSchema } from './JobLogWhereUniqueInputSchema';
import { JobLogUpdateWithoutJobInputSchema } from './JobLogUpdateWithoutJobInputSchema';
import { JobLogUncheckedUpdateWithoutJobInputSchema } from './JobLogUncheckedUpdateWithoutJobInputSchema';

export const JobLogUpdateWithWhereUniqueWithoutJobInputSchema: z.ZodType<Prisma.JobLogUpdateWithWhereUniqueWithoutJobInput> = z.object({
  where: z.lazy(() => JobLogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => JobLogUpdateWithoutJobInputSchema),z.lazy(() => JobLogUncheckedUpdateWithoutJobInputSchema) ]),
}).strict();

export default JobLogUpdateWithWhereUniqueWithoutJobInputSchema;
