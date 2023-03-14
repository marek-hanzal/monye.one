import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobScalarWhereInputSchema } from './JobScalarWhereInputSchema';
import { JobUpdateManyMutationInputSchema } from './JobUpdateManyMutationInputSchema';
import { JobUncheckedUpdateManyWithoutJobInputSchema } from './JobUncheckedUpdateManyWithoutJobInputSchema';

export const JobUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.JobUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => JobScalarWhereInputSchema),
  data: z.union([ z.lazy(() => JobUpdateManyMutationInputSchema),z.lazy(() => JobUncheckedUpdateManyWithoutJobInputSchema) ]),
}).strict();

export default JobUpdateManyWithWhereWithoutUserInputSchema;
