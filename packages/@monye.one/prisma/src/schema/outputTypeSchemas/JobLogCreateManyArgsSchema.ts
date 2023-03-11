import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobLogCreateManyInputSchema } from '../inputTypeSchemas/JobLogCreateManyInputSchema'

export const JobLogCreateManyArgsSchema: z.ZodType<Prisma.JobLogCreateManyArgs> = z.object({
  data: z.union([ JobLogCreateManyInputSchema,JobLogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default JobLogCreateManyArgsSchema;
