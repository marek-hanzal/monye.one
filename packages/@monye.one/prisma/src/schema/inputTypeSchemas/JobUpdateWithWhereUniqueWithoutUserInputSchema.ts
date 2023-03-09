import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobWhereUniqueInputSchema } from './JobWhereUniqueInputSchema';
import { JobUpdateWithoutUserInputSchema } from './JobUpdateWithoutUserInputSchema';
import { JobUncheckedUpdateWithoutUserInputSchema } from './JobUncheckedUpdateWithoutUserInputSchema';

export const JobUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.JobUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => JobWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => JobUpdateWithoutUserInputSchema),z.lazy(() => JobUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default JobUpdateWithWhereUniqueWithoutUserInputSchema;
