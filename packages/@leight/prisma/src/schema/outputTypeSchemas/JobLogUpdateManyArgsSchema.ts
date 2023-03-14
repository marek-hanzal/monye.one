import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobLogUpdateManyMutationInputSchema } from '../inputTypeSchemas/JobLogUpdateManyMutationInputSchema'
import { JobLogUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/JobLogUncheckedUpdateManyInputSchema'
import { JobLogWhereInputSchema } from '../inputTypeSchemas/JobLogWhereInputSchema'

export const JobLogUpdateManyArgsSchema: z.ZodType<Prisma.JobLogUpdateManyArgs> = z.object({
  data: z.union([ JobLogUpdateManyMutationInputSchema,JobLogUncheckedUpdateManyInputSchema ]),
  where: JobLogWhereInputSchema.optional(),
}).strict()

export default JobLogUpdateManyArgsSchema;
