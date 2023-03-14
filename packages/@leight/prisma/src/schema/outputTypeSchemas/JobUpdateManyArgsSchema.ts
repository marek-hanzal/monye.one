import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobUpdateManyMutationInputSchema } from '../inputTypeSchemas/JobUpdateManyMutationInputSchema'
import { JobUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/JobUncheckedUpdateManyInputSchema'
import { JobWhereInputSchema } from '../inputTypeSchemas/JobWhereInputSchema'

export const JobUpdateManyArgsSchema: z.ZodType<Prisma.JobUpdateManyArgs> = z.object({
  data: z.union([ JobUpdateManyMutationInputSchema,JobUncheckedUpdateManyInputSchema ]),
  where: JobWhereInputSchema.optional(),
}).strict()

export default JobUpdateManyArgsSchema;
