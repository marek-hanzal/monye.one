import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobLogCreateManyJobInputSchema } from './JobLogCreateManyJobInputSchema';

export const JobLogCreateManyJobInputEnvelopeSchema: z.ZodType<Prisma.JobLogCreateManyJobInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => JobLogCreateManyJobInputSchema),z.lazy(() => JobLogCreateManyJobInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default JobLogCreateManyJobInputEnvelopeSchema;
