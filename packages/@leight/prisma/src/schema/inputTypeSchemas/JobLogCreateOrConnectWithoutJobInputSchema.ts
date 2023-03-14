import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobLogWhereUniqueInputSchema } from './JobLogWhereUniqueInputSchema';
import { JobLogCreateWithoutJobInputSchema } from './JobLogCreateWithoutJobInputSchema';
import { JobLogUncheckedCreateWithoutJobInputSchema } from './JobLogUncheckedCreateWithoutJobInputSchema';

export const JobLogCreateOrConnectWithoutJobInputSchema: z.ZodType<Prisma.JobLogCreateOrConnectWithoutJobInput> = z.object({
  where: z.lazy(() => JobLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JobLogCreateWithoutJobInputSchema),z.lazy(() => JobLogUncheckedCreateWithoutJobInputSchema) ]),
}).strict();

export default JobLogCreateOrConnectWithoutJobInputSchema;
