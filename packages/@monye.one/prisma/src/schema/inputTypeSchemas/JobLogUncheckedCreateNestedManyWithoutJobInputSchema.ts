import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobLogCreateWithoutJobInputSchema } from './JobLogCreateWithoutJobInputSchema';
import { JobLogUncheckedCreateWithoutJobInputSchema } from './JobLogUncheckedCreateWithoutJobInputSchema';
import { JobLogCreateOrConnectWithoutJobInputSchema } from './JobLogCreateOrConnectWithoutJobInputSchema';
import { JobLogCreateManyJobInputEnvelopeSchema } from './JobLogCreateManyJobInputEnvelopeSchema';
import { JobLogWhereUniqueInputSchema } from './JobLogWhereUniqueInputSchema';

export const JobLogUncheckedCreateNestedManyWithoutJobInputSchema: z.ZodType<Prisma.JobLogUncheckedCreateNestedManyWithoutJobInput> = z.object({
  create: z.union([ z.lazy(() => JobLogCreateWithoutJobInputSchema),z.lazy(() => JobLogCreateWithoutJobInputSchema).array(),z.lazy(() => JobLogUncheckedCreateWithoutJobInputSchema),z.lazy(() => JobLogUncheckedCreateWithoutJobInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobLogCreateOrConnectWithoutJobInputSchema),z.lazy(() => JobLogCreateOrConnectWithoutJobInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobLogCreateManyJobInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JobLogWhereUniqueInputSchema),z.lazy(() => JobLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default JobLogUncheckedCreateNestedManyWithoutJobInputSchema;
