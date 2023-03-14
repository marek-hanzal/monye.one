import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobCreateManyInputSchema } from '../inputTypeSchemas/JobCreateManyInputSchema'

export const JobCreateManyArgsSchema: z.ZodType<Prisma.JobCreateManyArgs> = z.object({
  data: z.union([ JobCreateManyInputSchema,JobCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default JobCreateManyArgsSchema;
