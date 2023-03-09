import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobWhereUniqueInputSchema } from './JobWhereUniqueInputSchema';
import { JobCreateWithoutUserInputSchema } from './JobCreateWithoutUserInputSchema';
import { JobUncheckedCreateWithoutUserInputSchema } from './JobUncheckedCreateWithoutUserInputSchema';

export const JobCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.JobCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => JobWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JobCreateWithoutUserInputSchema),z.lazy(() => JobUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default JobCreateOrConnectWithoutUserInputSchema;
