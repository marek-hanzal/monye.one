import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobCreateWithoutUserInputSchema } from './JobCreateWithoutUserInputSchema';
import { JobUncheckedCreateWithoutUserInputSchema } from './JobUncheckedCreateWithoutUserInputSchema';
import { JobCreateOrConnectWithoutUserInputSchema } from './JobCreateOrConnectWithoutUserInputSchema';
import { JobUpsertWithWhereUniqueWithoutUserInputSchema } from './JobUpsertWithWhereUniqueWithoutUserInputSchema';
import { JobCreateManyUserInputEnvelopeSchema } from './JobCreateManyUserInputEnvelopeSchema';
import { JobWhereUniqueInputSchema } from './JobWhereUniqueInputSchema';
import { JobUpdateWithWhereUniqueWithoutUserInputSchema } from './JobUpdateWithWhereUniqueWithoutUserInputSchema';
import { JobUpdateManyWithWhereWithoutUserInputSchema } from './JobUpdateManyWithWhereWithoutUserInputSchema';
import { JobScalarWhereInputSchema } from './JobScalarWhereInputSchema';

export const JobUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.JobUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => JobCreateWithoutUserInputSchema),z.lazy(() => JobCreateWithoutUserInputSchema).array(),z.lazy(() => JobUncheckedCreateWithoutUserInputSchema),z.lazy(() => JobUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobCreateOrConnectWithoutUserInputSchema),z.lazy(() => JobCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JobUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => JobUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JobUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => JobUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JobUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => JobUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JobScalarWhereInputSchema),z.lazy(() => JobScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default JobUpdateManyWithoutUserNestedInputSchema;
