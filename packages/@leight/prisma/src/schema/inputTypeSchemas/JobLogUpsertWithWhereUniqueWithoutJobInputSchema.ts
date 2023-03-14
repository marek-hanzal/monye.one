import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobLogWhereUniqueInputSchema } from './JobLogWhereUniqueInputSchema';
import { JobLogUpdateWithoutJobInputSchema } from './JobLogUpdateWithoutJobInputSchema';
import { JobLogUncheckedUpdateWithoutJobInputSchema } from './JobLogUncheckedUpdateWithoutJobInputSchema';
import { JobLogCreateWithoutJobInputSchema } from './JobLogCreateWithoutJobInputSchema';
import { JobLogUncheckedCreateWithoutJobInputSchema } from './JobLogUncheckedCreateWithoutJobInputSchema';

export const JobLogUpsertWithWhereUniqueWithoutJobInputSchema: z.ZodType<Prisma.JobLogUpsertWithWhereUniqueWithoutJobInput> = z.object({
  where: z.lazy(() => JobLogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => JobLogUpdateWithoutJobInputSchema),z.lazy(() => JobLogUncheckedUpdateWithoutJobInputSchema) ]),
  create: z.union([ z.lazy(() => JobLogCreateWithoutJobInputSchema),z.lazy(() => JobLogUncheckedCreateWithoutJobInputSchema) ]),
}).strict();

export default JobLogUpsertWithWhereUniqueWithoutJobInputSchema;
