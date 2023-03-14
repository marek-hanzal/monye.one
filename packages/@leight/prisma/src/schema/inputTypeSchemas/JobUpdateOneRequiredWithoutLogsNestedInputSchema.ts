import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobCreateWithoutLogsInputSchema } from './JobCreateWithoutLogsInputSchema';
import { JobUncheckedCreateWithoutLogsInputSchema } from './JobUncheckedCreateWithoutLogsInputSchema';
import { JobCreateOrConnectWithoutLogsInputSchema } from './JobCreateOrConnectWithoutLogsInputSchema';
import { JobUpsertWithoutLogsInputSchema } from './JobUpsertWithoutLogsInputSchema';
import { JobWhereUniqueInputSchema } from './JobWhereUniqueInputSchema';
import { JobUpdateWithoutLogsInputSchema } from './JobUpdateWithoutLogsInputSchema';
import { JobUncheckedUpdateWithoutLogsInputSchema } from './JobUncheckedUpdateWithoutLogsInputSchema';

export const JobUpdateOneRequiredWithoutLogsNestedInputSchema: z.ZodType<Prisma.JobUpdateOneRequiredWithoutLogsNestedInput> = z.object({
  create: z.union([ z.lazy(() => JobCreateWithoutLogsInputSchema),z.lazy(() => JobUncheckedCreateWithoutLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JobCreateOrConnectWithoutLogsInputSchema).optional(),
  upsert: z.lazy(() => JobUpsertWithoutLogsInputSchema).optional(),
  connect: z.lazy(() => JobWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => JobUpdateWithoutLogsInputSchema),z.lazy(() => JobUncheckedUpdateWithoutLogsInputSchema) ]).optional(),
}).strict();

export default JobUpdateOneRequiredWithoutLogsNestedInputSchema;
