import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobWhereUniqueInputSchema } from './JobWhereUniqueInputSchema';
import { JobCreateWithoutLogsInputSchema } from './JobCreateWithoutLogsInputSchema';
import { JobUncheckedCreateWithoutLogsInputSchema } from './JobUncheckedCreateWithoutLogsInputSchema';

export const JobCreateOrConnectWithoutLogsInputSchema: z.ZodType<Prisma.JobCreateOrConnectWithoutLogsInput> = z.object({
  where: z.lazy(() => JobWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JobCreateWithoutLogsInputSchema),z.lazy(() => JobUncheckedCreateWithoutLogsInputSchema) ]),
}).strict();

export default JobCreateOrConnectWithoutLogsInputSchema;
