import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobCreateManyUserInputSchema } from './JobCreateManyUserInputSchema';

export const JobCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.JobCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => JobCreateManyUserInputSchema),z.lazy(() => JobCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default JobCreateManyUserInputEnvelopeSchema;
