import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobCreateWithoutUserInputSchema } from './JobCreateWithoutUserInputSchema';
import { JobUncheckedCreateWithoutUserInputSchema } from './JobUncheckedCreateWithoutUserInputSchema';
import { JobCreateOrConnectWithoutUserInputSchema } from './JobCreateOrConnectWithoutUserInputSchema';
import { JobCreateManyUserInputEnvelopeSchema } from './JobCreateManyUserInputEnvelopeSchema';
import { JobWhereUniqueInputSchema } from './JobWhereUniqueInputSchema';

export const JobCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.JobCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => JobCreateWithoutUserInputSchema),z.lazy(() => JobCreateWithoutUserInputSchema).array(),z.lazy(() => JobUncheckedCreateWithoutUserInputSchema),z.lazy(() => JobUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobCreateOrConnectWithoutUserInputSchema),z.lazy(() => JobCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default JobCreateNestedManyWithoutUserInputSchema;
