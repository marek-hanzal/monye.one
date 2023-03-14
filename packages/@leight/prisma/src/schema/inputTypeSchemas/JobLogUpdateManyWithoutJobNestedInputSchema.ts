import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobLogCreateWithoutJobInputSchema } from './JobLogCreateWithoutJobInputSchema';
import { JobLogUncheckedCreateWithoutJobInputSchema } from './JobLogUncheckedCreateWithoutJobInputSchema';
import { JobLogCreateOrConnectWithoutJobInputSchema } from './JobLogCreateOrConnectWithoutJobInputSchema';
import { JobLogUpsertWithWhereUniqueWithoutJobInputSchema } from './JobLogUpsertWithWhereUniqueWithoutJobInputSchema';
import { JobLogCreateManyJobInputEnvelopeSchema } from './JobLogCreateManyJobInputEnvelopeSchema';
import { JobLogWhereUniqueInputSchema } from './JobLogWhereUniqueInputSchema';
import { JobLogUpdateWithWhereUniqueWithoutJobInputSchema } from './JobLogUpdateWithWhereUniqueWithoutJobInputSchema';
import { JobLogUpdateManyWithWhereWithoutJobInputSchema } from './JobLogUpdateManyWithWhereWithoutJobInputSchema';
import { JobLogScalarWhereInputSchema } from './JobLogScalarWhereInputSchema';

export const JobLogUpdateManyWithoutJobNestedInputSchema: z.ZodType<Prisma.JobLogUpdateManyWithoutJobNestedInput> = z.object({
  create: z.union([ z.lazy(() => JobLogCreateWithoutJobInputSchema),z.lazy(() => JobLogCreateWithoutJobInputSchema).array(),z.lazy(() => JobLogUncheckedCreateWithoutJobInputSchema),z.lazy(() => JobLogUncheckedCreateWithoutJobInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobLogCreateOrConnectWithoutJobInputSchema),z.lazy(() => JobLogCreateOrConnectWithoutJobInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JobLogUpsertWithWhereUniqueWithoutJobInputSchema),z.lazy(() => JobLogUpsertWithWhereUniqueWithoutJobInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobLogCreateManyJobInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JobLogWhereUniqueInputSchema),z.lazy(() => JobLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JobLogWhereUniqueInputSchema),z.lazy(() => JobLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JobLogWhereUniqueInputSchema),z.lazy(() => JobLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JobLogWhereUniqueInputSchema),z.lazy(() => JobLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JobLogUpdateWithWhereUniqueWithoutJobInputSchema),z.lazy(() => JobLogUpdateWithWhereUniqueWithoutJobInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JobLogUpdateManyWithWhereWithoutJobInputSchema),z.lazy(() => JobLogUpdateManyWithWhereWithoutJobInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JobLogScalarWhereInputSchema),z.lazy(() => JobLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default JobLogUpdateManyWithoutJobNestedInputSchema;
