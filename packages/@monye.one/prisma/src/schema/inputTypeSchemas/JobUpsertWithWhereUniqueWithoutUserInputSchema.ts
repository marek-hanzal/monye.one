import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobWhereUniqueInputSchema } from './JobWhereUniqueInputSchema';
import { JobUpdateWithoutUserInputSchema } from './JobUpdateWithoutUserInputSchema';
import { JobUncheckedUpdateWithoutUserInputSchema } from './JobUncheckedUpdateWithoutUserInputSchema';
import { JobCreateWithoutUserInputSchema } from './JobCreateWithoutUserInputSchema';
import { JobUncheckedCreateWithoutUserInputSchema } from './JobUncheckedCreateWithoutUserInputSchema';

export const JobUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.JobUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => JobWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => JobUpdateWithoutUserInputSchema),z.lazy(() => JobUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => JobCreateWithoutUserInputSchema),z.lazy(() => JobUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default JobUpsertWithWhereUniqueWithoutUserInputSchema;
